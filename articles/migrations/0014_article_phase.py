# Generated by Django 3.2.8 on 2021-10-21 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0013_auto_20211020_2024'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='phase',
            field=models.CharField(choices=[('DRA', 'Draft'), ('SUB', 'Submitted'), ('PUB', 'Published'), ('REJ', 'Rejected'), ('ARC', 'Archived')], default='DRA', max_length=3),
        ),
    ]
