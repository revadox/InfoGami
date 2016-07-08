# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-06-29 07:45
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0036_auto_20160629_0250'),
    ]

    operations = [
        migrations.CreateModel(
            name='TheInfoQueryAnswerModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_text', models.CharField(max_length=200)),
                ('answer_vote', models.CharField(default=0, max_length=6)),
                ('info_query', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.TheInfoAddQueryModel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.UserProfileModel')),
            ],
        ),
    ]