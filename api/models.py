from django.db import models


# Create your models here.
class Depth(models.Model):
    type = models.CharField(max_length=12, default="Depth")

    symbol = models.CharField(max_length=12, default="", unique=True, primary_key=True)
    total_asks_volume = models.IntegerField(default=0)
    total_bids_volume = models.IntegerField(default=0)

    limit3 = models.FloatField(default=0.00)
    limit5 = models.FloatField(default=0.00)
    limit8 = models.FloatField(default=0.00)
    limit30 = models.FloatField(default=0.00)


class Funding(models.Model):
    type = models.CharField(max_length=12, default="Funding")

    symbol = models.CharField(max_length=12, default="", unique=True, primary_key=True)
    exchangeLogo = models.CharField(max_length=120, default="")

    binance_funding = models.FloatField(default=0.00)

    okx_funding = models.FloatField(default=0.00)
    dydx_funding = models.FloatField(default=0.00)
    bybit_funding = models.FloatField(default=0.00)
    gate_funding = models.FloatField(default=0.00)
    bitget_funding = models.FloatField(default=0.00)
    coinex_funding = models.FloatField(default=0.00)
    bingx_funding = models.FloatField(default=0.00)

    other_exchange_sum = models.FloatField(default=0.00)


class FundingFinal(models.Model):
    type = models.CharField(max_length=12, default="FundingFinal")

    symbol = models.CharField(max_length=12, default="", unique=True, primary_key=True)
    binance_positive = models.IntegerField(default=0)
    binance_balance = models.IntegerField(default=0)
    binance_negative = models.IntegerField(default=0)
    other_ex_positive = models.IntegerField(default=0)
    other_ex_balance = models.IntegerField(default=0)
    other_ex_negative = models.IntegerField(default=0)







