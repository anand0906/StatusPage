from django.urls import path
from .consumer import StatusConsumer

websocket_urlpatterns = [
    path('ws/status/', StatusConsumer.as_asgi()),
]
