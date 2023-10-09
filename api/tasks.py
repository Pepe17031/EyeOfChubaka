from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@shared_task
def send_message_to_channels():
    send_test_message("Hello from celery", 200)


def send_test_message(message: str, code: int):
    channel_layer = get_channel_layer()
    channel_name = 'api'
    async_to_sync(channel_layer.group_send)(channel_name, {
        'type': 'send_message',
        'message': message,
        'code': code
    })
