from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import *
from .serializers import *
from apps.users.views import broadcast_status_update



class IncidentAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        List all incidents for services in the user's organization.
        """
        incidents = Incident.objects.filter(service__organization=request.user.organization)
        serializer = IncidentSerializer(incidents, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new incident.
        """
        data = request.data
        data['service'] = data.get('service')  # Ensure the service is within the user's organization
        serializer = IncidentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            broadcast_status_update("Incident Added")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request):
        """
        Update a service's status.
        """
        pk=request.data.get('id')
        try:
            incident = Incident.objects.get(pk=pk)
        except Incident.DoesNotExist:
            return Response({"error": "Incident not found"}, status=status.HTTP_404_NOT_FOUND)

        status_value = request.data.get('status')
        if status_value not in [choice[0] for choice in Incident.STATUS_CHOICES]:
            return Response({"error": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)

        incident.status = status_value
        incident.description = request.data.get('description')
        incident.title=request.data.get('title')
        incident.service=Service.objects.get(id=request.data.get('service'))
        incident.save()
        broadcast_status_update("Incident Updated")
        serializer = IncidentSerializer(incident)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        """
        Update a service's status.
        """
        pk=request.GET.get('id')
        try:
            incident = Incident.objects.get(pk=pk)
        except Incident.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)
        incident.delete()
        broadcast_status_update("Incident Deleted")
        return Response({"message":"deleted successfully"}, status=status.HTTP_200_OK)



class MaintenanceAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        List all maintenance schedules for services in the user's organization.
        """
        maintenances = Maintenance.objects.filter(service__organization=request.user.organization)
        serializer = MaintenanceSerializer(maintenances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new maintenance schedule.
        """
        data = request.data
        data['service'] = data.get('service')  # Ensure the service is within the user's organization
        serializer = MaintenanceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
