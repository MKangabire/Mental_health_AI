release: python myproject/manage.py migrate
web: echo "Starting uvicorn" && uvicorn myproject.asgi:application --host 0.0.0.0 --port 8000 --log-level debug