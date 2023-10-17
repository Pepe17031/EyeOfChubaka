from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    #path('join/1', index)
]