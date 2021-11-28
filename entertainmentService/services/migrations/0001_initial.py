# Generated by Django 3.2.7 on 2021-11-28 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('games', '0001_initial'),
        ('series', '0001_initial'),
        ('films', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Название сервиса')),
                ('films', models.ManyToManyField(related_name='services', to='films.Film')),
                ('games', models.ManyToManyField(related_name='services', to='games.Game')),
                ('series', models.ManyToManyField(related_name='services', to='series.Series')),
            ],
        ),
    ]
