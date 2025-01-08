from django.shortcuts import render
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def broadcast_status_update(message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "status_updates",
        {
            "type": "status_update",
            "message": message,
        }
    )
