# Django基本使用方法

## 写在前面

不涉及任何Web理论知识介绍，只是为了组员能快速上手使用而写的简单教程

涉及内容比较简单，还请见谅（主要是我自己也比较菜，讲不明白）

## Django的安装

最快速的安装方法是使用pip命令安装

首先确保已安装python（.3以上），在终端输入```pip install Django```

如果安装报错，可能是pip版本太旧了，在终端输入```python -m pip install --upgrade pip```更新pip

ps：当然也可以下载安装包来安装，太懒了没试过（）

## Django基本项目结构和配置

### 创建项目

使用 django-admin.py 来创建名为***的项目：

在终端输入命令```django-admin startproject 项目名```，会生成项目框架

![image-20211122174651344](https://github.com/KUMORIII/md-Images/tree/main/images/image-20211122174651344.png)

> **manage.py:** 一个实用的命令行工具，可让你以各种方式与该 Django 项目进行交互。
>
> **__init__.py:** 一个空文件，告诉 Python 该目录是一个 Python 包。（不用管它）
>
> **settings.py:** 该 Django 项目的设置/配置。（需要修改，用来配置前后端，连接数据库）
>
> **urls.py:** 该 Django 项目的 URL 声明（就是设置的网页链接）

### 创建app模块

**app模块是什么**：就是Django项目的一个子项目，把整个项目根据不同的功能分成不同的小项目来编写，会更清晰。比如可以把学生考勤管理的项目分成，登录```login```、首页```mainpage```、学生界面```student```、教师界面```teacher```等。

使用```manage.py```脚本来创建app模块：

终端进入刚刚创建的项目文件中，输入```python manage.py startapp app名```，会自动生成app文件夹，该文件夹包括几个文件：

![image-20211122180404480](https://github.com/KUMORIII/md-Images/tree/main/images/image-20211122180404480.png)

每创建一个app就要打开project项目文件中的settings.py，找到```INSTALLED_APPS```，将自己创建的app名，加入到列表中，如下：

![image-20211122180752813](https://github.com/KUMORIII/md-Images/tree/main/images/image-20211122180752813.png)

### 关于前端配置

在项目目录中创建templates文件夹，将html网页界面文件放入其中，并在settings.py中找到```TEMPLATES```，在'DIRS'中输入templates文件夹的路径即可完成前端的配置

![image-20211122181522686](https://github.com/KUMORIII/md-Images/tree/main/images/image-20211122181522686.png)

另外关于静态渲染的css等文件，可以在目录中再创建static文件夹，存放css文件以及各种图片、gif等，从static文件夹路径中调取文件对界面进行渲染。

### 关于数据库配置

在settings.py中的```DATABASES```就是对数据库的配置

使用sqlite3数据库配置如下：

![image-20211122182129128](https://github.com/KUMORIII/md-Images/tree/main/images/image-20211122182129128.png)

使用MySql数据库配置格式如下：

![image-20211122182303292](https://github.com/KUMORIII/md-Images/tree/main/images/image-20211122182303292.png)

## manage.py常用命令

### Django项目运行方法

cd至根目录输入 ```python manage.py runserver```

若项目成功运行，会提示url，在浏览器中输入http://127.0.0.1:8000即可打开项目

进入后台管理：http://127.0.0.1:8000/admin/

### 数据库的同步和迁移命令

每次对model进行修改之后，都要运行 ```python manage.py makemigrations``` ```python manage.py migrate```

若在迁移的过程中报错比如“……已存在”，在迁移命令最后加上```--fake```即可

### 基于已有的数据库自动生成model命令

首先确保自己的项目已连接数据库，然后在根目录下运行命令：

```python manage.py inspectdb```

### 创建超级管理员

```python manage.py createsuperuser```

输入账号、密码和邮箱即可
