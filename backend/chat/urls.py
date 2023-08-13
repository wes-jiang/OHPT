from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('conversation/<int:pk>', views.conversation_details),
    path('course/<int:pk>', views.course_conversations)
    # path('drinks/<int:id>', views.drink_detail)
]

