import json
from channels.generic.websocket import AsyncWebsocketConsumer

class StatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Group name for broadcasting
        self.group_name = "status_updates"

        # Join the group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the group
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        # Handle incoming messages if needed
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'status_update',
                'message': data['message']
            }
        )

    async def status_update(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))
