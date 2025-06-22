Mental Health AI Chatbot

Overview
Mental Health AI is a Django-based web application that provides empathetic and context-aware responses to mental health queries using a fine-tuned BlenderBot model (facebook/blenderbot-400M-distill). The chatbot aims to support individuals seeking guidance on stress, anxiety, depression, and coping strategies, particularly in regions with limited access to mental health resources. The model is hosted on a Hugging Face Space (21Meru/blenderbot-mental-health), and the web app is deployed on Render (mental-health-ai-1.onrender.com). The project integrates a custom API (api.py) to communicate with the Hugging Face endpoint and supports a user-friendly chat interface.
Project Structure
Mental_health_AI/
├── blenderbot-mental-health/  # Fine-tuning scripts and model configurations
├── chatbot/                  # Virtual environment
├── myproject/               # Django application
│   ├── bot/                 # Chatbot app (views, URLs, templates)
│   ├── myproject/           # Django settings, URLs, ASGI/WSGI
│   └── manage.py
├── api.py                   # API integration with Hugging Face
├── push.py                  # Script to push model to Hugging Face
├── Procfile                 # Render deployment configuration
├── requirements.txt         # Python dependencies
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation

Features

Empathetic Responses: Generates supportive answers for mental health queries using a fine-tuned BlenderBot model.
Web Interface: Django-based chat interface accessible at /chat/.
Hugging Face Integration: Communicates with the 21Meru/blenderbot-mental-health Space API.
Render Deployment: Hosted on Render with SQLite for lightweight database management.
Scalable API: Supports POST requests to /chat/api/predict for external integrations.

Prerequisites

Python 3.9+
Git
Virtual environment (recommended)
Render account for deployment
Hugging Face account for model hosting
Local SQLite (included with Python)

Installation

Clone the Repository:
git clone https://github.com/MKangabire/Mental_health_AI.git
cd Mental_health_AI


Set Up Virtual Environment:
python -m venv chatbot
source chatbot/Scripts/activate  # Windows
# source chatbot/bin/activate    # macOS/Linux


Install Dependencies:
pip install -r requirements.txt


Configure Django Settings:

Edit myproject/myproject/settings.py:ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'mental-health-ai-1.onrender.com']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}




Apply Migrations:
cd myproject
python manage.py makemigrations
python manage.py migrate


Test Locally:
python manage.py runserver 0.0.0.0:8000

Visit http://localhost:8000/chat/ in a browser.


Deployment on Render

Push to GitHub:Ensure large files (e.g., db.sqlite3, final_model/) are excluded in .gitignore:
myproject/db.sqlite3
final_model/
*.bin
*.pth
chatbot/

Commit and push:
git add .
git commit -m "Prepare for Render deployment"
git push origin master


Create Render Web Service:

Log in to https://dashboard.render.com/.
Create a new Web Service linked to MKangabire/Mental_health_AI.
Set:
Runtime: Python
Build Command: pip install -r requirements.txt
Start Command: (defined in Procfile)


Add environment variables:PORT=8000
ALLOWED_HOSTS=mental-health-ai-1.onrender.com




Update Procfile:Ensure it uses uvicorn (or gunicorn if preferred):
release: python myproject/manage.py migrate
web: uvicorn myproject.asgi:application --host 0.0.0.0 --port $PORT


Deploy:Trigger a manual deploy and monitor logs for uvicorn binding to 0.0.0.0:8000.

Verify:Visit https://mental-health-ai-1.onrender.com/chat/.


Hugging Face Integration

Model: Fine-tuned BlenderBot hosted at 21Meru/fine_tuned_blenderbot.
Space: API endpoint at https://21Meru-blenderbot-mental-health.hf.space/api/predict.
Setup:
Run push.py to update the model:python push.py


Ensure api.py handles API requests to the Space.



Usage

Web Interface: Access the chatbot at https://mental-health-ai-1.onrender.com/chat/.
API:Send POST requests:curl -X POST https://mental-health-ai-1.onrender.com/chat/api/predict -d "user_input=I'm feeling stressed"



Troubleshooting

Port Binding:
Ensure uvicorn binds to 0.0.0.0:$PORT in Procfile.
Check Render logs for binding errors.


Migrations:
If migrations fail, verify SQLite path in settings.py and run python manage.py migrate.


Git Push Errors:
Check for large files:dir /s | where-object { $_.Length -gt 100MB }


Use git-filter-repo to remove large files like final_model/.


Hugging Face API:
Verify API endpoint in api.py.
Check rate limits on 21Meru/blenderbot-mental-health.



Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a Pull Request.

License
This project is licensed under the MIT License. See LICENSE for details.
References

Render Documentation
Django Documentation
Hugging Face Space
GitHub Repository

Contact
For issues or inquiries, contact MKangabire or open an issue on the GitHub repository.
