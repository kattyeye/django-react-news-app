# Generated by Django 3.2.8 on 2021-10-20 18:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(
                blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
