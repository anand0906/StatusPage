from django.urls import path
from .views import *

urlpatterns = [
    path('',OrganizationAPIView.as_view(),name="organizations"),
]