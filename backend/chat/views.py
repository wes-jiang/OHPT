from django.shortcuts import render
from django.utils import timezone
from datetime import datetime, timedelta

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Conversation, Message, Course
from .serializers import MessageSerializer, ConversationSerializer, UserSerializer

# do i need to import User from django.contrib.auth.models?

from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404

from django.http import HttpResponse, JsonResponse

# authentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

######################
### AUTHENTICATION ###
######################

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    
    # validate
    if serializer.is_valid():

        # TODO: check if username is already in use
        # old_user = User.objects.get(username=request.data["username"])
        # if old_user is not None:
        #     return Response("account with username already exists", status=status.HTTP_400_BAD_REQUEST)
        
        try:
            old_user = User.objects.get(username=request.data["username"])
            return Response("An account with this username already exists.", status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            # Continue with user registration
            pass

        # save the user to DB
        serializer.save()

        # retrieve the user as an object, then give that user a token
        user = User.objects.get(username=request.data["username"])
        token = Token.objects.create(user=user)

        # ??? how does this use the hashed password?
        user.set_password(request.data["password"])
        user.save()

        # return response containing token and the user data
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_user(request):
    """
    Edits user information.
    request: {
        "first_name": string
        "last_name": string
    }
    """
    # retrieve user
    user = request.user

    new_first_name = request.data["first_name"]
    new_last_name = request.data["last_name"]

    if new_first_name is not None:
        user.first_name = new_first_name
    if new_last_name is not None:
        user.last_name = new_last_name

    return Response("passed for {}".format(request.user.username))

# TODO: understand what these are doing from tutorial
# EXAMPLE
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    # why is this all that I need to do?
    return Response("passed for {}".format(request.user.username))



def set_cookie(token):
    # token, created = Token.objects.get_or_create(user=user)  # Replace with the correct attribute to access the token
    print('hset_cookie token ', token)
    response = HttpResponse("User token cookie set")
    response.set_cookie('userToken', token, path='/')
    return response
    
    

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    if request.user is not None:
        # print(request.user)
        return Response(request.user.id)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_name(request):
    if request.user is not None:
        return Response([request.user.first_name, request.user.last_name])
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    print('user login', user)
    # validate password
    if not user.check_password(request.data["password"]):
        print('login problem')
        # case where validation fails
        return Response({"detail": "not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # retrieve token for this user
    token, created = Token.objects.get_or_create(user=user)

    response_data = {
        "token": token.key,
        "user": UserSerializer(instance=user).data
    }

    # Create a JSON response
    response = JsonResponse(response_data)

    # Set the 'bookname' cookie
    # response['Access-Control-Allow-Origin'] = 'localhost:3000'
    response.set_cookie('bookname', 'Sherlock Holmes', path='/chat', domain='localhost')

    return response

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    print('user logout', request.user)

    try:
        token = Token.objects.get(user=request.user)
        print('token in logout', token)
        token.delete()
    except Token.DoesNotExist:
        pass

    return Response(status=status.HTTP_200_OK)

    

# /conversation/<int:pk>
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
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


        # token = Token.objects.get(key=token_key)
        # user = token.user
        conversation = Conversation.objects.get(pk=pk)

        messages = Message.objects.filter(conversation=conversation).order_by('time_sent')
        serializer = MessageSerializer(messages, many=True)
        print(serializer)
        return Response(serializer.data)


    # create a message
    elif request.method == 'POST':
        data = request.data
        data["time_sent"] = timezone.now()


        # TODO: OpenAI goes here
        

        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # retrieve correct conversation, then update title
        conversation = Conversation.objects.get(pk=pk)
        new_title = request.data['title']
        if new_title is not None:
            conversation.title = new_title
            # save
            conversation.save()
        serializer = ConversationSerializer(conversation, many=None)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        conversation = Conversation.objects.get(pk=pk)
        if conversation is not None:
            conversation.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response("conversation not found", status=status.HTTP_400_BAD_REQUEST)
        
    
        


# '/course/<int:pk>'
@csrf_exempt
@api_view(['GET', 'POST', 'OPTIONS'])
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
    if request.method == "OPTIONS":
        response = HttpResponse(status=204)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"  # Add other allowed methods
        response["Access-Control-Allow-Headers"] = "Authorization"  # Allow the required header
        return response
    if request.method == 'GET':
        token_header = request.META.get('HTTP_AUTHORIZATION')
        print('token_header in course', token_header)

        if token_header and token_header.startswith('Bearer '):
            token_key = token_header.split('Bearer ')[1]
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try: 
            token = Token.objects.get(key=token_key)
            user = token.user

        except Token.DoesNotExist:
            return None 

        course = Course.objects.get(pk=pk)
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)
        seven_days_ago = today - timedelta(days=7)
        thirty_days_ago = today - timedelta(days=30)
        # conversation_list = Conversation.objects.filter(course=course).order_by('-time_started')

        conversation_list = Conversation.objects.filter(user=user.id).filter(course=course)
        today_conversations = conversation_list.filter(time_started__date=today).order_by('-time_started')
        yesterday_conversations = conversation_list.filter(time_started__date=yesterday).order_by('-time_started')

        past_seven_days_conversations = conversation_list.filter(
            time_started__date__range=[seven_days_ago, yesterday]
            ).order_by('-time_started')
        past_thirty_days_conversations = conversation_list.filter(
            time_started__date__range=[thirty_days_ago, yesterday]
            ).order_by('-time_started')

        today_serializer = ConversationSerializer(today_conversations, many=True)
        yesterday_serializer = ConversationSerializer(yesterday_conversations, many=True)
        past_seven_days_serializer = ConversationSerializer(past_seven_days_conversations, many=True)
        past_thirty_days_serializer = ConversationSerializer(past_thirty_days_conversations, many=True)
        
        context = {
            'today_conversations': today_serializer.data,
            'yesterday_conversations': yesterday_serializer.data,
            'past_seven_days_conversations': past_seven_days_serializer.data,
            'past_thirty_days_conversations': past_thirty_days_serializer.data,
        }

        return Response(context)

    elif request.method == 'POST':
        # add time
        data = request.data
        data["time_started"] = timezone.now()

        serializer = ConversationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 'messages/star/<int:pk>'
@csrf_exempt
@api_view(["PUT"])
def edit_star(request, pk):
    """
    Edits (basically just the starred field) the message specified by pk in the request.
    request: {
        "starred": boolean
    }
    """
    # get message associated with the passed in pk
    # pk = request.data.get("pk")
    try:
        message = Message.objects.get(id=pk) 
        print('request', pk)
    
    except Message.DoesNotExist:
        return Response({"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND)
    

    # update fields that are contained within the request data
    # check if we star or not
    starred = request.data.get("starred")
    if starred is not None:
        message.starred = starred
        message.save()

    serializer = MessageSerializer(message, many=None)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def stats():
    total_messages = Message.objects.count()
    total_conversations = Conversation.objects.count()
    total_users = User.objects.count()

    return Response([total_messages, total_conversations, total_users])


@api_view(['POST'])
def feedback(request):
    return Response()
        
