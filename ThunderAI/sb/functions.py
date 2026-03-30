import jwt
import requests
from .supabase_client import supabase
import os


def _get_embedding(product: str):
    response = requests.post(
        "https://api.voyageai.com/v1/embeddings",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv('VOYAGE_API_KEY')}",
        },
        json={
            "input": [product],
            "model": "voyage-3",
        },
    )
    return response.json()["data"][0]["embedding"]

def get_active_cart():
    if not (session := supabase.auth.get_session()):
        raise PermissionError("Not authenticated")

    user_id = session.user.id

    data = (
        supabase.table("shopping_carts")
        .select(
            "id, "
            "shopping_cart_items ("
            "  priced_product_id, "
            "  product_pricing ("
            "    price, discount, "
            "    product_catalog (name, description, image_url, product_details)"
            "  )"
            ")"
        )
        .eq("cart_status", "active")
        .eq("profile_id", user_id)
        .execute()
        .data
    )
    return data

def search_products(product: str):
    embedding = _get_embedding(product)

    top_products = supabase.rpc("get_top_products", 
            {
                "query_embedding": embedding,
                "top_n": 5
            }
        ).execute().data
    return top_products
    
def authenticate_user(jwt_token: str):
    token = jwt_token.replace("Bearer ", "")
    supabase.postgrest.auth(token)

