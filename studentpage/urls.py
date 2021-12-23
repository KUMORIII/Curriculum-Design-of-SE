from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('studentpage/',views.mainpage,name = 'mainpage'),
    path('studentpage/<str:operation>/', views.inquireList),
    path('studentpage/<str:operation>/<str:id>', views.itemDetial),
]