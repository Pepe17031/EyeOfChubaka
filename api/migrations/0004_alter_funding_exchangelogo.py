# Generated by Django 4.2.6 on 2023-10-16 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_funding_depth_exchangelogo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='funding',
            name='exchangeLogo',
            field=models.CharField(default='', max_length=120),
        ),
    ]