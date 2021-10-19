from django.db import models

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to='article_images', null=True,)
    # class Meta:
    #     ordering = ('-created_at',)

    def __str__(self):
        return self.title
