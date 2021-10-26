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

    DRAFT = 'DRA'
    SUBMITTED = 'SUB'
    PUBLISHED = "PUB"
    REJECTED = 'REJ'
    ARCHIVED = 'ARC'
    PHASE_OPTIONS = [
        (DRAFT, "Draft"),
        (SUBMITTED, "Submitted"),
        (PUBLISHED, "Published"),
        (REJECTED, "Rejected"),
        (ARCHIVED, "Archived"),
    ]
    phase = models.CharField(
        default='DRA',
        choices=PHASE_OPTIONS,
        max_length=3
    )

    HOME = 'HOM'
    FOOD = 'FOO'
    FASHION = "FAS"
    TRAVEL = "TRA"
    LOCAL = 'LOC'
    GLOBAL = 'GLO'
    CATEGORY_OPTIONS = [
        (HOME, "Home"),
        (FOOD, "Food"),
        (TRAVEL, "Travel"),
        (FASHION, "Fashion"),
        (LOCAL, "Local"),
        (GLOBAL, "Global"),
    ]
    category = models.CharField(
        default='HOM',
        choices=CATEGORY_OPTIONS,
        max_length=3
    )

    # is_published = models.BooleanField(default=False)
    # is_rejected = models.BooleanField(default=False)
    # is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.title
