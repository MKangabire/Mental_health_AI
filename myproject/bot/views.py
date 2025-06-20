from gradio_client import Client
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

API_URL = "https://21Meru-blenderbot-mental-health.hf.space/"

def chat_view(request):
    # Initialize session for storing messages
    if not request.session.get('messages'):
        request.session['messages'] = []
    print("Initial session messages:", request.session['messages'])  # Debug print

    if request.method == "POST":
        print("POST request received:", request.POST)  # Debug print

        if request.POST.get("clear_session"):
            print("Clearing session messages")  # Debug print
            request.session['messages'] = []
            request.session.modified = True
            return render(request, "bot/chat.html", {
                "messages": request.session['messages']
            })

        user_input = request.POST.get("user_input", "").strip()
        print("User input:", user_input)  # Debug print
        if not user_input:
            print("Empty user input")  # Debug print
            return render(request, "bot/chat.html", {
                "error": "Please enter a message.",
                "messages": request.session['messages']
            })

        try:
            # Initialize Gradio client
            print("Initializing Gradio client")  # Debug print
            client = Client(API_URL)
            # Make prediction using Gradio client with positional arguments
            print("Sending API request")  # Debug print
            result = client.predict(
                user_input,  # Pass input positionally
                api_name="/predict"
            )
            print("API Response:", result)  # Debug print
            # Handle response (try multiple formats)
            if isinstance(result, list) and result:
                bot_response = result[0].get("generated_text", str(result[0])) if isinstance(result[0], dict) else str(result[0])
            elif isinstance(result, dict):
                bot_response = result.get("generated_text", str(result))
            else:
                bot_response = str(result) if result else "Error: No response generated."
            print("Bot response:", bot_response)  # Debug print
            
            # Append messages to session
            request.session['messages'].append({"sender": "User", "text": user_input})
            request.session['messages'].append({"sender": "Bot", "text": bot_response})
            request.session.modified = True  # Ensure session is saved
            print("Updated session messages:", request.session['messages'])  # Debug print

            return render(request, "bot/chat.html", {
                "messages": request.session['messages']
            })
        except Exception as e:
            print("API error:", str(e))  # Debug print
            return render(request, "bot/chat.html", {
                "error": f"Error processing request: {e}",
                "messages": request.session['messages']
            })

    print("Rendering GET request with messages:", request.session['messages'])  # Debug print
    return render(request, "bot/chat.html", {
        "messages": request.session['messages']
    })

@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        user_input = request.POST.get("user_input", "").strip()
        if not user_input:
            return JsonResponse({"error": "Invalid or empty input"}, status=400)

        try:
            client = Client(API_URL)
            result = client.predict(
                user_input,  # Pass input positionally
                api_name="/predict"
            )
            print("API Response (chat_api):", result)  # Debug print
            if isinstance(result, list) and result:
                bot_response = result[0].get("generated_text", str(result[0])) if isinstance(result[0], dict) else str(result[0])
            elif isinstance(result, dict):
                bot_response = result.get("generated_text", str(result))
            else:
                bot_response = str(result) if result else "Error: No response generated."
            return JsonResponse({"generated_text": bot_response, "success": True})
        except Exception as e:
            print("API error (chat_api):", str(e))  # Debug print
            return JsonResponse({"error": f"Error processing request: {e}"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)