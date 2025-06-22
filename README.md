Absolutely! Here’s a **well-structured, clean, and readable** version of your `README.md` that will look great when rendered. You can copy and paste this directly:

---

# 🧠 Mental Health AI Chatbot

**A Django-based web app providing empathetic, context-aware responses for mental health support.**
Leveraging a fine-tuned BlenderBot model ([facebook/blenderbot-400M-distill](https://huggingface.co/facebook/blenderbot-400M-distill)), this app aims to help individuals seeking guidance on stress, anxiety, depression, and coping strategies — especially in areas with limited access to mental health resources.

**🌐 Demo:** [https://mental-health-ai-1.onrender.com/](https://mental-health-ai-1.onrender.com/)

---

## 📂 Project Structure

```
Mental_health_AI/
├─ blenderbot-mental-health/           # Model fine-tuning & configurations
├─ chatbot/                           # Virtual environment
├─ myproject/                         
│  ├─ bot/                           # Chat app (views, urls, templates)
│  └─ myproject/                     # Django settings, urls, ASGI/WSGI
├─ api.py                           # Hugging Face Space API integration
├─ push.py                          # Push model to Hugging Face
├─ Procfile                          # Render deployment configuration
├─ requirements.txt                  # Dependencies
├─ .gitignore                        # Git ignored files
├─ README.md                         # Project documentation
```

---

## ⚡️ Features

* 💚 **Empathetic Responses**: Supports queries about stress, anxiety, depression, and coping strategies.
* 🌐 **Web Chat Interface**: Accessible at `/chat/`.
* 🤗 **Hugging Face Integration**: Model hosted at [21Meru/blenderbot-mental-health](https://21Meru-blenderbot-mental-health.hf.space).
* ☁️ **Render Deployment**: Deployed and configured for Render, using SQLite or a configured database.
* 🚀 **Scalable API**: Supports POST requests at `/chat/api/predict` for external integrations.

---

## 🐍 Prerequisites

* Python 3.9+
* Git
* Virtual environment (recommended)
* Render account for deployment
* Hugging Face account for model hosting
* SQLite (built-in)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MKangabire/Mental_health_AI.git
cd Mental_health_AI
```

### 2️⃣ Create and Activate Virtual Environment

Windows:

```bash
python -m venv chatbot
source chatbot/Scripts/activate
```

macOS/Linux:

```bash
source chatbot/bin/activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Django Settings

Edit `myproject/myproject/settings.py`:

```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'mental-health-ai-1.onrender.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

### 5️⃣ Apply Migrations

```bash
cd myproject
python manage.py makemigrations
python manage.py migrate
```

### 6️⃣ Test Locally

```bash
python manage.py runserver 0.0.0.0:8000
```

Visit: [http://localhost:8000/chat/](http://localhost:8000/chat/)

---

## 🚀 Deployment on Render

1. Push your code to GitHub:

   * Ensure `.gitignore` excludes large files:

     ```
     myproject/db.sqlite3
     final_model/
     *.bin
     *.pth
     chatbot/
     ```

2. Create a **Render Web Service**:

   * **Runtime**: Python
   * **Build Command**:

     ```
     pip install -r requirements.txt
     ```
   * **Start Command**:

     ```
     uvicorn myproject.asgi:application --host 0.0.0.0 --port $PORT
     ```

3. Add Environment Variables:

   * `PORT = 8000`
   * `ALLOWED_HOSTS = mental-health-ai-1.onrender.com`

4. Ensure your `Procfile` contains:

   ```
   release: python myproject/manage.py migrate
   web: uvicorn myproject.asgi:application --host 0.0.0.0 --port $PORT
   ```

5. Trigger a manual deployment and review Render Logs.

---

## 🤗 Hugging Face Model Integration

* Model: **[21Meru/fine\_tuned\_blenderbot](https://21Meru-blenderbot-mental-health.hf.space)**
* Endpoint: `https://21Meru-blenderbot-mental-health.hf.space/api/predict`

#### Usage

Send a POST request:

```bash
curl -X POST https://mental-health-ai-1.onrender.com/chat/api/predict \
-d "user_input=I'm feeling stressed"
```

---

## 🔥 Common Issues & Solutions

* **Port Binding**: Ensure `uvicorn` binds to `0.0.0.0:$PORT`.
* **Migrations**: Run `python manage.py migrate` (in Render Build Command).
* **Git Push Errors**: Remove large files (`final_model/`, `.bin`, `.pth`) using `.gitignore` or `git filter-repo`.
* **Hugging Face API**: Check rate limits and confirm the endpoint is working.

---

## 👥 Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## 📞 Contact

For issues or inquiries:

* Contact **MKangabire**.
* Open an issue on the [GitHub Repository](https://github.com/MKangabire/Mental_health_AI).

---

Would you like a slightly stylized version with badges (Python, Django, Render, Hugging Face)? Let me know! 🙂
