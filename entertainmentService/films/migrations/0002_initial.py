# Generated by Django 3.2.7 on 2021-11-07 05:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('companies', '0001_initial'),
        ('films', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='film',
            name='actors',
            field=models.ManyToManyField(related_name='films', to='users.Actor'),
        ),
        migrations.AddField(
            model_name='film',
            name='company',
            field=models.ManyToManyField(related_name='films', to='companies.Company'),
        ),
        migrations.AddField(
            model_name='film',
            name='director',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='films', to='users.director'),
        ),
        migrations.AddField(
            model_name='film',
            name='genres',
            field=models.ManyToManyField(related_name='films', to='films.Genre'),
        ),
    ]
