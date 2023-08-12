from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('conversation/<int:pk>', views.message_list),
    path('conversation/test', views.test)
    # path('drinks/<int:id>', views.drink_detail)
]