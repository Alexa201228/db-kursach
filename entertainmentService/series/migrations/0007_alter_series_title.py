# Generated by Django 3.2.7 on 2021-12-12 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('series', '0006_alter_series_series_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='series',
            name='title',
            field=models.CharField(max_length=250, null=True, verbose_name='Название сериала'),
        ),
    ]