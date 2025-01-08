"""
ASGI config for statuspagebackend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import apps.users.urls  # Replace with your app's routing module

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'statuspagebackend.settings')

# Define the ASGI application
application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # HTTP requests
    "websocket": AuthMiddlewareStack(
        URLRouter(
            apps.users.urls.websocket_urlpatterns  # WebSocket URLs
        )
    ),
})