from django.shortcuts import render
from django.utils import timezone

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Conversation, Message, Course
from .serializers import MessageSerializer, ConversationSerializer, UserSerializer

# /conversation/<int:pk>
@api_view(['GET', 'POST', 'PUT'])
def conversation_details(request, pk):
    """
    get all messages from specified conversation, then serialize them
    GET: 
    request = {
    
    }

    POST:
    request = {
        sender: string,
        content: string,
        conversation: pk,
    }

    PUT:
    request = {
        new_title: string
    }
    """
    # TODO: validate that conversation belongs to user

    if request.method == 'GET':
        user = User.objects.get(pk=1)
        conversation = Conversation.objects.get(pk=pk)

        messages = Message.objects.filter(conversation=conversation)
        serializer = MessageSerializer(messages, many=True)
        print(serializer)
        return Response(serializer.data)


    elif request.method == 'POST':
        data = request.data
        data["time_sent"] = timezone.now
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # retrieve correct conversation, then update title
        conversation = Conversation.objects.get(pk=pk)
        conversation.title = request.data.title

        # save
        conversation.save()
        return Response(status=status.HTTP_200_OK)
        


# @api_view(['GET', 'POST'])
# def conversation_list(request):

# '/course/<int:pk>'
@api_view(['GET', 'POST'])
def course_conversations(request, pk):
    """
    get all conversations (their IDs + their names) from specified course, then serialize them
    return:
    [
        {"title": ____, "id": _____},
        {"title": ____, "id": _____},
        {"title": ____, "id": _____}
    ]
    """

    if request.method == 'GET':
        course = Course.objects.get(pk=pk)
        conversation_list = Conversation.objects.filter(course=course)

        return_list = []
        for conversation in conversation_list:
            return_list.append({
                "title": conversation.title,
                "id": conversation.pk 
            })
        return Response(return_list)

    elif request.method == 'POST':
        # add time
        data = request.data
        data["time_started"] = timezone.now

        serializer = ConversationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



