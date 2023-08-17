# Generated by Django 4.2.4 on 2023-08-16 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chat", "0008_alter_user_options_alter_user_managers_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                blank=True, max_length=254, verbose_name="email address"
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=100, unique=True),
        ),
    ]