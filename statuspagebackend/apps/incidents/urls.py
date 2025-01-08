from django.urls import path
from .views import *

urlpatterns = [
    path('incidents/',IncidentAPIView.as_view(),name="incidents"),
    path('maintenance/',MaintenanceAPIView.as_view(),name="maintenance"),
]