from django.urls import path
from .views import *

urlpatterns = [
    path('',ServiceAPIView.as_view(),name="services"),
]