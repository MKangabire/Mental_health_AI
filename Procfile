release: python myproject/manage.py migrate
web: gunicorn myproject.wsgi:application --bind 0.0.0.0:$PORT