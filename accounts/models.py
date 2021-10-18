from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='profiles/', null=True)
    alias = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.user.username
