import json
from ai.ai_client import client as ai_client
from sb.supabase_client import supabase
from sb.functions import search_products, get_active_cart, authenticate_user
from ai.context import tools, system_prompt

def run_agent(user_message: str, jwt_token: str = None):
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    authenticate_user(jwt_token)

    while True:
        response = ai_client.chat.completions.create(
            model="qwen-plus", 
            messages=messages, 
            tools=tools
        ).choices[0].message

        messages.append(response)
        
        if not response.tool_calls:
            return response.content
            
        for tool in response.tool_calls:
            name, args = tool.function.name, json.loads(tool.function.arguments)
            try:
                if name == "search_products":
                    print("getting product")
                    res = search_products(args.get("product"))
                elif name == "get_active_cart":
                    res = get_active_cart()
                else:
                    res = "Unknown function"
            except Exception as e:
                res = f"Error: {e}"
                print(res)

            messages.append({
                "role": "tool", 
                "tool_call_id": tool.id, 
                "name": name, 
                "content": json.dumps(res)
            })

