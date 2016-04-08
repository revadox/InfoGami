from __future__ import unicode_literals
from django_markdown.models import MarkdownField

from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from taggit.managers import TaggableManager

class CodehubTopicModel(models.Model):
    user = models.ForeignKey(User)
    topic_heading = models.CharField(max_length = 100)
    topic_detail = MarkdownField()
    topic_link = models.CharField(max_length = 100,blank = True)
    # tags = models.CharField(max_length = 50)
    tags = TaggableManager()
    timeStamp = models.DateTimeField(auto_now_add = True)
    topic_type = models.CharField(max_length = 10)
    file = models.FileField(upload_to = 'uploads/',blank = True)

    def __str__(self):
        return self.topic_heading


class CodehubTopicCommentModel(models.Model):
    user = models.ForeignKey(User)
    topic = models.ForeignKey('CodehubTopicModel')
    comment_text = MarkdownField()
    timeStamp = models.DateTimeField()

    def __str__(self):
        return self.topic.topic_heading


#this will store the extra profile details of the user
class UserProfileModel(models.Model):
    user = models.ForeignKey(User)
    user_description = MarkdownField()
    skills = models.CharField(max_length = 200)
    user_type_select = models.CharField(max_length = 50,default = 'None')   #developer or programmer
    timeStamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.user.username


class CodehubCreateEventModel(models.Model):
    user = models.ForeignKey(User)
    event_heading = models.CharField(max_length = 100)
    event_date = models.DateTimeField(null = True,blank = True)
    event_venue = models.CharField(max_length = 100)
    event_description = MarkdownField()
    event_for  = models.CharField(max_length = 25)#basic or advanced
    timeStamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.event_heading


class CodehubEventQuestionModel(models.Model):
    user = models.ForeignKey(User)
    event = models.ForeignKey(CodehubCreateEventModel)
    question_text = MarkdownField()
    timeStamp = models.DateTimeField(auto_now_add = True)



class MusicModel(models.Model):
    user = models.ForeignKey(User)
    music_name = models.CharField(max_length = 100)
    music_file = models.FileField(upload_to = 'music/')
    music_lang = models.CharField(max_length = 20)
    music_artist = models.CharField(max_length = 30)
    timeStamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.music_name


class CodehubQuestionModel(models.Model):
    user = models.ForeignKey(User)
    question_heading = models.CharField(max_length = 200)
    question_description = MarkdownField()
    question_link = models.CharField(max_length = 100,blank = True)
    question_tags = TaggableManager()
    question_type = models.CharField(max_length = 20)
    timeStamp = models.DateTimeField(auto_now_add = True)


    def __str__(self):
        return self.question_heading

class CodehubQuestionCommentModel(models.Model):
    user = models.ForeignKey(User)
    question = models.ForeignKey(CodehubQuestionModel)
    comment_text = MarkdownField()
    timeStamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.question.question_heading


class BlogModel(models.Model):
    user = models.ForeignKey(User)
    content = models.CharField(max_length = 500)
