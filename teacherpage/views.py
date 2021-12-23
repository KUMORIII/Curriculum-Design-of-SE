from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, request, response

# Create your views here.
def mainpage(request):
    pass

def inquireList(request, operation):
    
    if operation == 'teaCheckingList':
        pass
    if operation == 'teaAppealList':
        pass
    if operation == 'teaLeaveList':
        pass
    
def itemDetail(request, operation, id):
    pass