# Generated by Django 3.2.7 on 2021-12-12 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('series', '0005_alter_series_actors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='series',
            name='series_number',
            field=models.IntegerField(blank=True, null=True, verbose_name='Количество серий'),
        ),
    ]
