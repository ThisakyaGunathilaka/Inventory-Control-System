# Generated by Django 3.1.4 on 2020-12-24 02:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('errors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exceptions',
            name='message',
            field=models.TextField(blank=True, null=True),
        ),
    ]
