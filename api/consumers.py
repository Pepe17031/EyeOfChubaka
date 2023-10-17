from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class DepthConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "depth", self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "depth", self.channel_name
        )

    def send_message(self, event):
        self.send(text_data=event['message'])


class FundingConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "funding", self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "funding", self.channel_name
        )

    def send_message(self, event):
        self.send(text_data=event['message'])


class FundingFinalConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "funding_final", self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "funding_final", self.channel_name
        )

    def send_message(self, event):
        self.send(text_data=event['message'])