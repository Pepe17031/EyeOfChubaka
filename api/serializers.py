from models import Depth
from rest_framework import serializers


class DepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depth
        fields = ('symbol', 'total_asks_volume', 'total_bids_volume', 'limit3', 'limit5', 'limit8', 'limit30')


