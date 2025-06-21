release: python myproject/manage.py migrate
web: uvicorn myproject.asgi:application --host 0.0.0.0 --port $PORT