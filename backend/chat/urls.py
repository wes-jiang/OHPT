from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('conversation/<int:pk>', views.conversation_details),
    # path('conversation', views.conversation),
    path('course/<int:pk>', views.course_conversations),

    path('signup', views.signup),
    path('login', views.login),
    path('validate', views.test_token)
    # path('drinks/<int:id>', views.drink_detail)
]

