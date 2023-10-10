from django.db import models


# Create your models here.
class Depth(models.Model):
    symbol = models.CharField(max_length=12, default="", unique=True, primary_key=True)

    total_asks_volume = models.IntegerField(default=0)
    total_bids_volume = models.IntegerField(default=0)

    limit3 = models.FloatField(default=0.00)
    limit5 = models.FloatField(default=0.00)
    limit8 = models.FloatField(default=0.00)
    limit30 = models.FloatField(default=0.00)

