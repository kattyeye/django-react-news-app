# Generated by Django 3.2.8 on 2021-10-25 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0015_article_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='category',
            field=models.CharField(choices=[('HOM', 'Home'), ('FOO', 'Food'), ('TRA', 'Travel'), ('FAS', 'Fashion'), ('LOC', 'Local'), ('GLO', 'Global')], default='HOM', max_length=3),
        ),
    ]
