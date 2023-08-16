from rest_framework import serializers
from .models import Conversation, Message, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'password')
        # extra_kwargs = {'sections': {'required': False}}

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ('id', 'user', 'course', 'time_started', 'title')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'sender', 'content', 'conversation')
