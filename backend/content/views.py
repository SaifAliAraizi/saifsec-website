from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
import logging


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


logger = logging.getLogger(__name__)
class ContactCreate(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Save the message first.
        # Even if email fails, the message will still appear in Django Admin.
        message = serializer.save()

        email_user = getattr(settings, "EMAIL_HOST_USER", "")
        email_password = getattr(settings, "EMAIL_HOST_PASSWORD", "")
        receiver_email = getattr(settings, "CONTACT_RECEIVER_EMAIL", "")
        default_from_email = getattr(settings, "DEFAULT_FROM_EMAIL", "")

        # Only try SMTP if credentials are configured.
        # This prevents Render/Gunicorn from hanging if Brevo is missing or incomplete.
        if email_user and email_password and receiver_email:
            try:
                send_mail(
                    subject=f"[SaifSec Contact] {message.subject}",
                    message=(
                        f"Name: {message.name}\n"
                        f"Email: {message.email}\n\n"
                        f"Message:\n{message.message}"
                    ),
                    from_email=default_from_email,
                    recipient_list=[receiver_email],
                    fail_silently=True,
                )

                logger.info(
                    "Contact email sent successfully: %s",
                    message.subject,
                )

            except Exception as error:
                # Do not break the frontend/contact form if email fails.
                logger.error(
                    "Contact message saved, but email failed: %s",
                    error,
                )
        else:
            logger.info(
                "SMTP credentials missing/incomplete. "
                "Contact message saved to database only."
            )

        return Response(
            {
                "ok": True,
                "message": "Message saved successfully.",
            },
            status=status.HTTP_201_CREATED,
        )