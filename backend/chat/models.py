from django.db import models
from django.utils import timezone

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100, default="")

    # added classes

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=100)


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE) # TODO: if we delete a course, don't want the chats to be deleted
    title = models.CharField(max_length=100)
    time_started = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class Message(models.Model):
    sender = models.CharField(max_length=50)
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    time_sent = models.DateTimeField(default=timezone.now)



