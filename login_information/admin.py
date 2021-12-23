from django.contrib import admin
from .models import CheckInfo, CheckAppeal, LeaveInfo, CourseInfo, TeaCourse, TeacherInfo, StudentInfo, ScCourse

# Register your models here.

# 向admin注册需管理的model
admin.site.register(CheckAppeal)
admin.site.register(CheckInfo)
admin.site.register(LeaveInfo)
admin.site.register(CourseInfo)
admin.site.register(TeacherInfo)
admin.site.register(TeaCourse)
admin.site.register(StudentInfo)
admin.site.register(ScCourse)


admin.site.site_title = "AHU-Student考勤管理" # 设置title名称
admin.site.site_header = "AHU-Student-Django考勤管理" # 设置header名称