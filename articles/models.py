from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Article(models.Model):
    category = models.CharField(max_length=255, default='General')
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    published = models.BooleanField(default=False)
