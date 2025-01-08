from django.db import models
import uuid
from apps.organizations.models import Organization
# Create your models here.
class Service(models.Model):
    STATUS_CHOICES = [
        ('Operational', 'Operational'),
        ('Degraded Performance', 'Degraded Performance'),
        ('Partial Outage', 'Partial Outage'),
        ('Major Outage', 'Major Outage'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Operational')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
