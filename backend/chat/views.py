from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Conversation, Message
from .serializers import MessageSerializer

from django.http import HttpResponse

def test(request):
    print("worked")
    return HttpResponse('<h1>test</h1>')



@api_view(['GET', 'POST'])
def message_list(request, pk):
    """
    get all messages from specified conversation, then serialize them
    """

    if request.method == 'GET':
        user = User.objects.get(pk=2)
        conversation = Conversation.objects.get(pk=pk)

        messages = Message.objects.filter(conversation=conversation)
        serializer = MessageSerializer(messages, many=True)
        print(serializer)
        return Response(serializer.data)


    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'POST'])
# def conversation_list(request):



