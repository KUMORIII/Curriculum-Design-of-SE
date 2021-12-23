from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('teacherpage/',views.mainpage,name = 'mainpage'),
    path('teacherpage/<str:operation>/', views.inquireList),
    path('teacherpage/<str:operation>/<str:id>', views.itemDetail),
]