from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Service
from .serializers import ServiceSerializer
from apps.users.views import broadcast_status_update


class ServiceAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        List all services for the user's organization.
        """
        services = Service.objects.filter(organization=request.user.organization)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new service.
        """
        data = request.data
        data['organization'] = request.user.organization.id  # Link to the user's organization
        serializer = ServiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            broadcast_status_update("Service Added")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        """
        Update a service's status.
        """
        pk=request.data.get('id')
        try:
            service = Service.objects.get(pk=pk, organization=request.user.organization)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

        status_value = request.data.get('status')
        if status_value not in [choice[0] for choice in Service.STATUS_CHOICES]:
            return Response({"error": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)

        service.status = status_value
        service.description = request.data.get('description')
        service.save()
        serializer = ServiceSerializer(service)
        broadcast_status_update("Service Updated")
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        """
        Update a service's status.
        """
        pk=request.GET.get('id')
        try:
            service = Service.objects.get(pk=pk, organization=request.user.organization)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)
        service.delete()
        broadcast_status_update("Service Deleted")
        return Response({"message":"deleted successfully"}, status=status.HTTP_200_OK)
