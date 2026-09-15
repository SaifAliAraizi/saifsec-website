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
    LessonSection,
    Service,
    Writeup,
    ContactMessage,
    Lab,
    LabSection,
)


# ---------- Site Config ----------
@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("brand_name", "hero_name", "email", "updated")
    fieldsets = (
        ("Brand", {
            "fields": ("logo", "brand_name", "tagline"),
        }),
        ("Hero", {
            "fields": ("hero_name", "hero_title", "hero_description", "profile_image"),
        }),
        ("Contact", {
            "fields": (
                "email",
                "phone",
                "contact_image",
                "contact_image_alt",
            ),
        }),
        ("Socials", {
            "fields": ("youtube_url", "linkedin_url", "github_url"),
        }),
    )


# ---------- Experience ----------
class ExperiencePointInline(admin.TabularInline):
    model = ExperiencePoint
    extra = 2
    classes = ("collapse",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "period", "order")
    list_editable = ("order",)
    inlines = [ExperiencePointInline]


# ---------- Certifications ----------
@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "issued_date", "expiry_date", "order")
    list_editable = ("order",)
    list_filter = ("issuer",)
    search_fields = ("title", "credential_id")


# ---------- Courses ----------
class CourseTextInline(admin.TabularInline):
    model = CourseText
    extra = 1
    classes = ("collapse",)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("title",)}
    inlines = [CourseTextInline]
    fieldsets = (
        ("Card", {
            "fields": ("title", "slug", "subtitle", "description", "image", "order"),
        }),
        ("Detail Page", {
            "fields": ("badge_image",),
        }),
    )

# ---------- Courses: Modules and Lessons ----------

class LessonSectionInline(admin.StackedInline):
    model = LessonSection
    extra = 1


class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 1


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "module", "order")
    list_editable = ("order",)
    list_filter = ("module__course",)
    search_fields = ("title",)
    inlines = [LessonSectionInline]


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")
    list_editable = ("order",)
    list_filter = ("course",)
    inlines = [LessonInline]


# ---------- Services ----------
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "order")
    list_editable = ("icon", "order")


# ---------- Writeups ----------
@admin.register(Writeup)
class WriteupAdmin(admin.ModelAdmin):
    list_display = ("task", "event", "author", "order")
    list_editable = ("order",)
    list_filter = ("event",)
    search_fields = ("task", "event", "tags")
    ordering = ("event", "order", "task")


# ---------- Contact Messages ----------
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "read", "created")
    list_filter = ("read",)
    search_fields = ("name", "email", "subject")
    actions = ["mark_as_read"]

    @admin.action(description="Mark selected as read")
    def mark_as_read(self, request, queryset):
        queryset.update(read=True)


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