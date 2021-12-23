from django.db import models

# Create your models here.

class StudentInfo(models.Model):
    stu_id = models.CharField('学号', primary_key=True, max_length=9)
    stu_name = models.CharField('姓名', max_length=15)
    sex = models.BooleanField('性别', blank=False, choices=((False, '女'), (True, '男')))
    major = models.CharField('专业', max_length=20, blank=False)
    stu_passwd = models.CharField('密码', max_length=20, blank=False)

    class Meta:
        managed = True
        verbose_name_plural='学生信息表'
        db_table = 'student_info'
    
        
class CourseInfo(models.Model):
    cour_id = models.CharField('课程代码', primary_key=True, max_length=7)
    course_name = models.CharField('课程名', max_length=12)
    classroom = models.CharField('教室', max_length=8)
    week_start = models.IntegerField('开始周数', default=1)
    week_end = models.IntegerField('结束周数', default=18)

    class Meta:
        managed = True
        verbose_name_plural='课程信息表'
        db_table = 'course_info'
        
        
class ScCourse(models.Model):
    stu_cour_id = models.AutoField(primary_key=True, editable=False)
    stu = models.ForeignKey(StudentInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='学生')
    course = models.ForeignKey(CourseInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='课程')

    class Meta:
        managed = True
        verbose_name_plural='学生选课表'
        db_table = 'sc_course'


class TeacherInfo(models.Model):
    tea_id = models.CharField('教师编号', primary_key=True, max_length=9)
    tea_name = models.CharField('教师名', max_length=15, blank=False)
    tea_password = models.CharField('密码', max_length=20, blank=False)

    class Meta:
        managed = True
        verbose_name_plural='教师信息表'
        db_table = 'teacher_info'


class TeaCourse(models.Model):
    tea_cour_id = models.AutoField(primary_key=True, editable=False)
    tea_id = models.ForeignKey(TeacherInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='教师')
    course_id = models.ForeignKey(CourseInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='课程')

    class Meta:
        managed = True
        verbose_name_plural='教师授课表'
        db_table = 'tea_course'



class CheckInfo(models.Model):
    check_id = models.AutoField(primary_key=True, editable=False)
    stu_id = models.ForeignKey(StudentInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='学生')
    course_id = models.ForeignKey(CourseInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='课程')
    state = models.CharField('考勤状态', max_length=1, blank=False, null=True, default='0', choices=(('0', '缺勤'), ('1', '迟到'), ('2', '请假'), ('3', '正常')))
    check_week = models.IntegerField('周数', blank=False, null=True)
    punch_time = models.DateTimeField('打卡时间', blank=True, null=True)

    class Meta:
        managed = True
        verbose_name_plural='考勤信息表'
        db_table = 'check_info'

class CheckAppeal(models.Model):
    appeal_id = models.AutoField(primary_key=True, editable=False)
    check_id = models.ForeignKey(CheckInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='考勤记录')
    appeal_reason = models.TextField('申诉理由', blank=True, null=True)
    appeal_state = models.IntegerField('申诉状态', blank=False, null=True, default=0, choices=((0, '待审核'), (1, '未通过'), (2, '通过')))

    class Meta:
        managed = True
        verbose_name_plural='考勤申诉表'
        db_table = 'check_appeal'



class LeaveInfo(models.Model):
    leave_id = models.AutoField(primary_key=True, editable=False)
    stu_id = models.ForeignKey(StudentInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='学生')
    course_id = models.ForeignKey(CourseInfo, models.DO_NOTHING, blank=False, null=True, verbose_name='课程')
    weeks = models.IntegerField('周数', blank=False)
    leave_reason = models.TextField('请假理由', blank=True, null=True)
    leave_state = models.IntegerField('申请状态', blank=False, null=True, default=0, choices=((0, '待审核'), (1, '未通过'), (2, '通过')))

    class Meta:
        managed = True
        verbose_name_plural='请假信息表'
        db_table = 'leave_info'

