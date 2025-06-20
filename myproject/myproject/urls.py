from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("chat/", include("bot.urls")),
    path("api/", include("bot.urls")),
]