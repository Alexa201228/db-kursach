# Generated by Django 3.2.7 on 2021-12-12 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0003_auto_20211205_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='genre',
            name='name',
            field=models.CharField(max_length=50, null=True, verbose_name='Название жанра'),
        ),
    ]
