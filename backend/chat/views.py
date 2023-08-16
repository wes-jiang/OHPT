from django.shortcuts import render
from django.utils import timezone

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Conversation, Message, Course
from .serializers import MessageSerializer, ConversationSerializer, UserSerializer

# do i need to import User from django.contrib.auth.models?

from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404

from django.http import HttpResponse

# authentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

def test(request):
    print("worked")
    return HttpResponse('<h1>test</h1>')

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    
    # validate
    if serializer.is_valid():

        # TODO: check if username is already in use
        

        # save the user to DB
        serializer.save()

        # retrieve the user as an object, then give that user a token
        user = User.objects.get(username=request.data["username"])
        print(user)
        print(type(user))
        token = Token.objects.create(user=user)

        # ??? how does this use the hashed password?
        user.set_password(request.data["password"])
        user.save()

        # return response containing token and the user data
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# TODO: understand what these are doing from tutorial
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    # why is this all that I need to do?
    return Response("passed for {}".format(request.user.username))


@api_view(['GET'])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])

    # validate password
    if not user.check_password(request.data["password"]):
        # case where validation fails
        return Response({"detail": "not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # retrieve token for this user
    token, created = Token.objects.get_or_create(user=user)

    # get the serialized user instance to return in response
    serializer = UserSerializer(instance=user)
    
    return Response({"token": token.key, "user": serializer.data})
        

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
        data["time_sent"] = timezone.now()
        print(data["time_sent"])
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # retrieve correct conversation, then update title
        conversation = Conversation.objects.get(pk=pk)
        new_title = request.data.title
        if new_title is not None:
            conversation.title = new_title

        # save
        conversation.save()
        return Response(status=status.HTTP_200_OK)
        


# @api_view(['GET', 'POST'])
# def conversation_list(request):

# '/course/<int:pk>'
@csrf_exempt
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
    # return HttpResponse('<h1> hello </h1>')
    if request.method == 'GET':
        course = Course.objects.get(pk=pk)
        conversation_list = Conversation.objects.filter(course=course)

        return_list = []
        for conversation in conversation_list:
            return_list.append({
                "title": conversation.title,
                "id": conversation.pk 
            })
        print(len(return_list))
        return Response(return_list)

    elif request.method == 'POST':
        # add time
        data = request.data
        data["time_started"] = timezone.now()

        serializer = ConversationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# '/message'
@api_view(["PUT"])
def message(request):
    """
    Edits (basically just the starred field) the message specified by pk in the request.
    request: {
        pk: int
    }
    """
    # get message associated with the passed in pk
    message = Message.objects.get(pk=request.data.pk) 

    # update fields that are contained within the request data
    # check if we star or not
    starred = request.data.get("starred")
    if starred is not None:
        message.starred = starred
    
    message.save()
    serializer = MessageSerializer(message, many=None)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
