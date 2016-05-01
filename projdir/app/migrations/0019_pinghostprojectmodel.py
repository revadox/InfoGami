# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-01 16:12
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0018_auto_20160429_2352'),
    ]

    operations = [
        migrations.CreateModel(
            name='PingHostProjectModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hosted_event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.HostProjectModel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.UserProfileModel')),
            ],
        ),
    ]
