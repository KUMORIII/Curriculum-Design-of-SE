from django.core.checks.messages import Critical
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, request, response
from login_information.models import *

# Create your views here.
def mainpage(request):
    user_id=request.COOKIES.get('userid', '') # 获取登录cookie信息
    student=StudentInfo.objects.get(stu_id=user_id) # 查询学生信息
    scourse_list = ScCourse.objects.filter(stu=student) # 查询学生选课记录
    course_list = []
    for sc in scourse_list: # 遍历选课记录和课程信息表，查询所选课程详细信息
        course = CourseInfo.objects.get(cour_id=sc.course.cour_id)
        course_list.append(course)
    check_list = CheckInfo.objects.filter(stu_id=student) # 查询学生考勤记录
    # render显示学生首页
    return render(request, 'mainpage/studentpage.html', {'student': student, 'course_list': course_list, 'check_list': check_list})

def inquireList(request, operation):
    
    if operation == 'stuCheckingList':
        pass
    if operation == 'stuLeaveList':
        pass
    
def itemDetial(request, operation, id):
    pass