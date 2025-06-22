release: python myproject/manage.py migrate
web: echo "Starting uvicorn" && uvicorn myproject.asgi:application --host 0.0.0.0 --port $PORT --log-level debug