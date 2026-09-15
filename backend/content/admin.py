from django.contrib import admin

from .models import (
    SiteConfig,
    Experience,
    ExperiencePoint,
    Certification,
    Course,
    CourseText,
    Module,
    Lesson,
    LessonImage,
    Service,
    Writeup,
    ContactMessage,
    Lab,
    LabSection,
)

# =========================================================
# SITE CONFIG
# =========================================================

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("brand_name", "hero_name", "email", "updated")

    fieldsets = (
        (
            "Brand",
            {
                "fields": (
                    "logo",
                    "brand_name",
                    "tagline",
                ),
            },
        ),
        (
            "Hero",
            {
                "fields": (
                    "hero_name",
                    "hero_title",
                    "hero_description",
                    "profile_image",
                ),
            },
        ),
        (
            "Contact",
            {
                "fields": (
                    "email",
                    "phone",
                    "contact_image",
                    "contact_image_alt",
                ),
            },
        ),
        (
            "Socials",
            {
                "fields": (
                    "youtube_url",
                    "linkedin_url",
                    "github_url",
                ),
            },
        ),
    )


# =========================================================
# EXPERIENCE
# =========================================================

class ExperiencePointInline(admin.TabularInline):
    model = ExperiencePoint
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "period", "order")
    list_editable = ("order",)
    inlines = [ExperiencePointInline]


# =========================================================
# CERTIFICATIONS
# =========================================================

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "issuer",
        "issued_date",
        "expiry_date",
        "order",
    )
    list_editable = ("order",)
    list_filter = ("issuer",)
    search_fields = ("title", "credential_id")


# =========================================================
# COURSES
# =========================================================

class CourseTextInline(admin.TabularInline):
    model = CourseText
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("title",)}
    inlines = [CourseTextInline]

    fieldsets = (
        (
            "Course Card",
            {
                "fields": (
                    "title",
                    "slug",
                    "subtitle",
                    "description",
                    "image",
                    "order",
                ),
            },
        ),
        (
            "Course Detail Page",
            {
                "fields": (
                    "badge_image",
                ),
            },
        ),
    )


# =========================================================
# Lessons
# =========================================================
class LessonImageInline(admin.TabularInline):
    model = LessonImage
    extra = 1
    readonly_fields = ("image_url_display",)

    def image_url_display(self, obj):
        if obj.image:
            return obj.image.url
        return "Save to generate Cloudinary URL"
    image_url_display.short_description = "Copy this URL into your Markdown"


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "module", "order")
    list_editable = ("order",)
    list_filter = ("module__course", "module")
    search_fields = ("title",)
    inlines = [LessonImageInline]


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1
    fields = ("title", "order")


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")
    list_editable = ("order",)
    list_filter = ("course",)
    inlines = [LessonInline]


# =========================================================
# SERVICES
# =========================================================

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "order")
    list_editable = ("icon", "order")


# =========================================================
# CTF WRITE-UPS
# =========================================================

@admin.register(Writeup)
class WriteupAdmin(admin.ModelAdmin):
    list_display = ("task", "event", "author", "order")
    list_editable = ("order",)
    list_filter = ("event",)
    search_fields = ("task", "event", "tags")
    ordering = ("event", "order", "task")


# =========================================================
# LABS
# =========================================================

class LabSectionInline(admin.StackedInline):
    model = LabSection
    extra = 1


@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    list_display = ("title", "group", "slug", "order")
    list_editable = ("group", "order")
    list_filter = ("group",)
    search_fields = ("title", "group", "slug")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("group", "order")
    inlines = [LabSectionInline]


# =========================================================
# CONTACT MESSAGES
# =========================================================

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "read", "created")
    list_filter = ("read",)
    search_fields = ("name", "email", "subject")
    actions = ("mark_as_read",)

    @admin.action(description="Mark selected messages as read")
    def mark_as_read(self, request, queryset):
        queryset.update(read=True)