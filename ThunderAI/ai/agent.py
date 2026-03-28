import json
from ai.ai_client import client
from sb.functions import search_products, get_active_cart
from ai.context import tools, system_prompt

def run_agent(user_message: str, jwt_token: str = None):
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    while True:
        response = client.chat.completions.create(
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
                    res = get_active_cart(jwt_token) if jwt_token else "Error: Not authenticated"
                else:
                    res = "Unknown function"
            except Exception as e:
                res = f"Error: {e}"

            messages.append({
                "role": "tool", 
                "tool_call_id": tool.id, 
                "name": name, 
                "content": json.dumps(res)
            })

