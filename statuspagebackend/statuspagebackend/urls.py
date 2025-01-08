from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('activity/',include("apps.incidents.urls")),
    path('organizations/',include("apps.organizations.urls")),
    path('services/',include("apps.services.urls")),
]