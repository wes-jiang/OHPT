from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('conversation/<int:pk>', views.conversation_details),
    path('course/<int:pk>', views.course_conversations),

    path('signup', views.signup),
    path('login', views.login),
    path('validate', views.test_token),
    path('edit_user', views.edit_user),
    path('message/star/<int:pk>', views.edit_star),
    path('get_user_id', views.get_user_id),
    path('get_user_names', views.get_user_name),
    path('logout', views.logout)

    


    
]

