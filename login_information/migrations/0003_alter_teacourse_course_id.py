# Generated by Django 3.2.8 on 2021-12-14 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login_information', '0002_auto_20211214_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacourse',
            name='course_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='login_information.courseinfo', verbose_name='课程'),
        ),
    ]