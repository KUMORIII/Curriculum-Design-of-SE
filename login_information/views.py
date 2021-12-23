from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect, response
from .models import *
from django.contrib import  auth
# Create your views here.

# def re(response):
#     return  response
def index(request):
    if request.method == "GET": # request=GET
        userid = '学号'
        passwords = '密码'
        values = '/'
        return render(request,'login/login.html',{'userid':userid,'passwords':passwords,'values':values}) # render显示html
    else: # request=POST 
        userid = request.POST.get('userid', '') # 从前端form中获取学号userid和密码passwd
        passwords = request.POST.get('passwords', '')
        user = ''
        iss = False
        for s in StudentInfo.objects.all(): # 遍历学生信息表中的每个数据，比对登录信息
            if s.stu_id == userid: # 学号比对成功，记录
                user = s
                iss = True
                    
        if user == '': # 比对失败，返回失败信息，刷新界面
            passwords = '密码'
            values = '/'
            return render(request, 'login/login.html', {'userid':userid, 'passwords': passwords, 'values': values})
        elif iss: # 比对成功，继续比对密码
            if user.stu_passwd == passwords: # 密码比对成功
                response = HttpResponseRedirect('/studentpage/') # 进入学生首页
                response.set_cookie('userid', userid) # 设置cookie
                response.set_cookie('state', 'client')
                return response
            else: # 比对失败，返回失败信息，刷新界面
                passwords = '密码错误'
                values = userid
                userid = '学号'
                return render(request, 'login/login.html', {'userid':userid, 'passwords': passwords, 'values': values})