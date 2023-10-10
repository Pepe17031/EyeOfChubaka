from celery import shared_task
from channels.layers import get_channel_layer
from .models import Depth
import asyncio
import json
channel_layer = get_channel_layer()


@shared_task()
def send_depth_data():
    non_zero_data = Depth.objects.filter(total_asks_volume__gt=0).values(
        "symbol",
        "total_asks_volume",
        "total_bids_volume",
        "limit3",
        "limit5",
        "limit8",
        "limit30"
    ).order_by("symbol")
    data = list(non_zero_data)  # Преобразовать QuerySet в список словарей
    # print("Start data sending" + str(data))
    asyncio.run(process_send_depth_data(data))


async def process_send_depth_data(data):

    await channel_layer.group_send(
        "api",
        {"type": "send_message", "message": json.dumps(data)}
    )
