from django.urls import path
from .views import message_stream


urlpatterns = [
    path('', message_stream, name="message_stream"),
]
