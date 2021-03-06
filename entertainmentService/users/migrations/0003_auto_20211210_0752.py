# Generated by Django 3.2.7 on 2021-12-10 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_is_manager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='first_name',
            field=models.CharField(max_length=50, null=True, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='actor',
            name='last_name',
            field=models.CharField(max_length=50, null=True, verbose_name='Фамилия'),
        ),
        migrations.AlterField(
            model_name='director',
            name='first_name',
            field=models.CharField(max_length=50, null=True, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='director',
            name='last_name',
            field=models.CharField(max_length=50, null=True, verbose_name='Фамилия'),
        ),
    ]
