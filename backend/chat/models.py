from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class User(AbstractUser):
    first_name = models.CharField(max_length=100, default="")
    last_name = models.CharField(max_length=100, default="")
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100, default="")

    # added classes

    def __str__(self):
        return self.first_name + self.last_name

class Course(models.Model):
    title = models.CharField(max_length=100)


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE) # TODO: if we delete a course, don't want the chats to be deleted
    title = models.CharField(max_length=100)
    time_started = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


def get_sources_default():
    return []
class Message(models.Model):
    sender = models.CharField(max_length=50)
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    starred = models.BooleanField(default=False)
    time_sent = models.DateTimeField(default=timezone.now)
    sources = ArrayField(models.CharField(max_length=50), default=get_sources_default)


    



