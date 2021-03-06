# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-07-09 20:24
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0044_auto_20160710_0051'),
    ]

    operations = [
        migrations.AddField(
            model_name='createusergroupmodel',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 7, 9, 20, 24, 16, 702119, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='createusergroupmodel',
            name='modified',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 7, 9, 20, 24, 38, 599309, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='createusergroupmodel',
            name='group_name',
            field=models.CharField(max_length=50),
        ),
    ]
