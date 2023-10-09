from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/api/", consumers.ApiConsumer.as_asgi())
]
