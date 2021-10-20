from django.db import models
from django.conf import settings
# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    body = models.TextField()
    image = models.ImageField(
        upload_to='article_images', null=True, blank=True)
    # class Meta:
    #     ordering = ('-created_at',)

    def __str__(self):
        return self.title
