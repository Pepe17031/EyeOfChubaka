from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/depth/", consumers.DepthConsumer.as_asgi()),
    path("ws/funding/", consumers.FundingConsumer.as_asgi()),
    path("ws/funding-final/", consumers.FundingFinalConsumer.as_asgi()),

]
