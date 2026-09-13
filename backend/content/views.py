from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings


from .models import (
    SiteConfig, Experience, Certification, Course, Service, Writeup, Lab
)
from .serializers import (
    SiteConfigSerializer, ExperienceSerializer, CertificationSerializer,
    CourseListSerializer, CourseDetailSerializer, ServiceSerializer,
    WriteupSerializer, ContactMessageSerializer, LabListSerializer, LabDetailSerializer
)


class SiteConfigView(APIView):
    def get(self, request):
        config = SiteConfig.objects.first()
        if not config:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        return Response(SiteConfigSerializer(config, context={"request": request}).data)


class ExperienceList(generics.ListAPIView):
    queryset = Experience.objects.prefetch_related("points")
    serializer_class = ExperienceSerializer


class CertificationList(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class CourseList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseListSerializer


class CourseDetail(generics.RetrieveAPIView):
    queryset = Course.objects.prefetch_related("texts", "modules__lessons")
    serializer_class = CourseDetailSerializer
    lookup_field = "slug"


class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class LabList(generics.ListAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabListSerializer


class LabDetail(generics.RetrieveAPIView):
    queryset = Lab.objects.prefetch_related("sections")
    serializer_class = LabDetailSerializer
    lookup_field = "slug"

class WriteupList(generics.ListAPIView):
    queryset = Writeup.objects.all()
    serializer_class = WriteupSerializer


class ContactCreate(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        # Invalid input returns HTTP 400 with field errors.
        serializer.is_valid(raise_exception=True)

        # Save the submission to the database.
        serializer.save()

        # Confirm receipt, not email delivery.
        return Response(
            {
                "ok": True,
                "message": "Your message has been received.",
            },
            status=status.HTTP_201_CREATED,
        )