# Generated by Django 4.2.4 on 2023-08-13 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chat", "0004_course_alter_conversation_course"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="password",
            field=models.CharField(default="", max_length=100),
        ),
    ]
