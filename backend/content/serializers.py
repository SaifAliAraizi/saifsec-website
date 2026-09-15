from rest_framework import serializers

from .models import (
    SiteConfig,
    Experience,
    Certification,
    Course,
    Module,
    Lesson,
    Service,
    Writeup,
    ContactMessage,
    Lab,
    LabSection,
)


# =========================================================
# SITE CONFIG
# =========================================================

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = [
            "logo",
            "brand_name",
            "tagline",
            "hero_name",
            "hero_title",
            "hero_description",
            "profile_image",
            "email",
            "phone",
            "contact_image",
            "contact_image_alt",
            "youtube_url",
            "linkedin_url",
            "github_url",
        ]


# =========================================================
# EXPERIENCE
# =========================================================

class ExperienceSerializer(serializers.ModelSerializer):
    responsibilities = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            "id",
            "title",
            "company",
            "location",
            "period",
            "responsibilities",
        ]

    def get_responsibilities(self, obj):
        return [point.text for point in obj.points.all()]


# =========================================================
# CERTIFICATIONS
# =========================================================

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            "id",
            "title",
            "issuer",
            "issued_date",
            "expiry_date",
            "credential_id",
            "description",
            "image",
            "verify_url",
        ]


# =========================================================
# COURSES
# =========================================================

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "content",
        ]


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = [
            "id",
            "title",
            "lessons",
        ]


class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "id",
            "slug",
            "title",
            "description",
            "image",
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    overview = serializers.SerializerMethodField()
    prerequisites = serializers.SerializerMethodField()
    recommended_reading = serializers.SerializerMethodField()

    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "slug",
            "title",
            "subtitle",
            "description",
            "image",
            "badge_image",
            "overview",
            "prerequisites",
            "recommended_reading",
            "modules",
        ]

    def get_course_texts(self, obj, kind):
        return [
            course_text.text
            for course_text in obj.texts.filter(kind=kind)
        ]

    def get_overview(self, obj):
        return self.get_course_texts(obj, "overview")

    def get_prerequisites(self, obj):
        return self.get_course_texts(obj, "prerequisite")

    def get_recommended_reading(self, obj):
        return self.get_course_texts(obj, "reading")


# =========================================================
# SERVICES
# =========================================================

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "icon",
            "description",
        ]


# =========================================================
# LABS
# =========================================================

class LabSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabSection
        fields = [
            "id",
            "heading",
            "body",
            "image",
            "order",
        ]


class LabListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = [
            "id",
            "slug",
            "title",
            "subtitle",
            "group",
        ]


class LabDetailSerializer(serializers.ModelSerializer):
    sections = LabSectionSerializer(many=True, read_only=True)

    class Meta:
        model = Lab
        fields = [
            "id",
            "slug",
            "title",
            "subtitle",
            "group",
            "sections",
        ]


# =========================================================
# CTF WRITE-UPS
# =========================================================

class WriteupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writeup
        fields = [
            "id",
            "event",
            "task",
            "tags",
            "author",
            "github_url",
        ]


# =========================================================
# CONTACT
# =========================================================

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "name",
            "email",
            "subject",
            "message",
        ]