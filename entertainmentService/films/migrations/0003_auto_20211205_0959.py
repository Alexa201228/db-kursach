# Generated by Django 3.2.7 on 2021-12-05 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_is_manager'),
        ('companies', '0001_initial'),
        ('films', '0002_auto_20211205_0919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='actors',
            field=models.ManyToManyField(blank=True, related_name='films', to='users.Actor'),
        ),
        migrations.AlterField(
            model_name='film',
            name='company',
            field=models.ManyToManyField(blank=True, related_name='films', to='companies.Company'),
        ),
        migrations.AlterField(
            model_name='film',
            name='genres',
            field=models.ManyToManyField(blank=True, related_name='films', to='films.Genre'),
        ),
    ]
