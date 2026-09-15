from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base: adds created/updated timestamps to every model."""
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# =========================================================
# SITE-WIDE CONFIG (brand, hero, contact, socials)
# Singleton: always one row (pk=1)
# =========================================================
class SiteConfig(TimeStampedModel):
    # Brand
    logo = models.ImageField(upload_to="brand/", null=True, blank=True)
    brand_name = models.CharField(max_length=100, default="SaifSec")
    tagline = models.CharField(
        max_length=255,
        default="Where offensive thinking meets defensive security.",
    )

    # Hero
    hero_name = models.CharField(max_length=120)
    hero_title = models.CharField(max_length=120)
    hero_description = models.TextField()
    profile_image = models.ImageField(upload_to="brand/", null=True, blank=True)

    # Contact
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    contact_image = models.ImageField(
        upload_to="contact/",
        blank=True,
        null=True,
        help_text="Image displayed beside the contact form.",
    )

    contact_image_alt = models.CharField(
        max_length=200,
        default="Security operations workspace",
        blank=True,
    )

    # Socials
    youtube_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Site Config"
        verbose_name_plural = "Site Config"

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce singleton
        super().save(*args, **kwargs)

    def __str__(self):
        return f"SiteConfig – {self.brand_name}"


# =========================================================
# EXPERIENCE
# =========================================================
class Experience(TimeStampedModel):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=120, blank=True)
    period = models.CharField(max_length=120)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "experiences"

    def __str__(self):
        return f"{self.title} – {self.company}"


class ExperiencePoint(models.Model):
    """A single bullet point under an experience entry."""
    experience = models.ForeignKey(
        Experience, on_delete=models.CASCADE, related_name="points"
    )
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Experience Point"
        verbose_name_plural = "Experience Points"

    def __str__(self):
        return self.text[:50]


# =========================================================
# CERTIFICATIONS
# =========================================================
class Certification(TimeStampedModel):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=120)
    issued_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=120, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to="certifications/", null=True, blank=True)
    verify_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


# =========================================================
# COURSES (cards + detail + player content)
# =========================================================
class Course(TimeStampedModel):
    slug = models.SlugField(unique=True, help_text="URL identifier, e.g. python-defensive-security")
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    description = models.TextField(help_text="Short description shown on the course card")
    image = models.ImageField(upload_to="courses/", null=True, blank=True, help_text="Card thumbnail")
    badge_image = models.ImageField(upload_to="courses/", null=True, blank=True, help_text="Large badge/emblem on the detail page")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class CourseText(models.Model):
    KINDS = [
        ("overview", "Overview"),
        ("prerequisite", "Prerequisite"),
        ("reading", "Recommended Reading"),
    ]
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="texts")
    kind = models.CharField(max_length=20, choices=KINDS)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Course Text"
        verbose_name_plural = "Course Texts"

    def __str__(self):
        return f"[{self.kind}] {self.text[:40]}"


class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules")
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.course.title} / {self.title}"


class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.module.course.title} / {self.title}"


class LessonSection(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="sections")
    heading = models.CharField(max_length=200, blank=True)
    body = models.TextField(blank=True, help_text="Separate paragraphs with a blank line.")
    bullets = models.TextField(blank=True, help_text="Write each bullet point on a new line.")
    image = models.ImageField(upload_to="lessons/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Lesson Section"
        verbose_name_plural = "Lesson Sections"

    def __str__(self):
        return f"{self.lesson.title} / {self.heading or f'Section {self.order}'}"


# =========================================================
# SERVICES
# =========================================================
class Service(TimeStampedModel):
    ICON_CHOICES = [
        ("wifi", "Wifi / Network"),
        ("key", "Key / Password"),
        ("globe", "Globe / Website"),
        ("server", "Server"),
        ("shield", "Shield"),
        ("bug", "Bug"),
        ("lock", "Lock"),
        ("terminal", "Terminal"),
    ]
    title = models.CharField(max_length=120)
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default="wifi")
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


# =========================================================
# LABS
# =========================================================
class Lab(TimeStampedModel):
    group = models.CharField(
        max_length=200,
        default="OWASP Juice Shop",
        help_text="Project name that groups related labs, e.g. OWASP Juice Shop",
    )
    slug = models.SlugField(
        unique=True,
        help_text="URL identifier, e.g. injection",
    )
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.group} / {self.title}"


class LabSection(models.Model):
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, related_name="sections")
    heading = models.CharField(max_length=200)
    body = models.TextField(help_text="Paragraphs. Separate paragraphs with a blank line.")
    image = models.ImageField(upload_to="labs/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.lab.title} / {self.heading}"

# =========================================================
# CTF WRITE-UPS
# =========================================================
class Writeup(TimeStampedModel):
    event = models.CharField(max_length=120)
    task = models.CharField(max_length=200)
    tags = models.JSONField(
        default=list,
        blank=True,
        help_text='JSON list, e.g. ["Cryptography", "rsa"]. Include a category name as a tag to file it into that folder.',
    )
    author = models.CharField(max_length=120)
    github_url = models.URLField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["event", "order", "task"]

    def __str__(self):
        return f"{self.event} / {self.task}"


# =========================================================
# CONTACT MESSAGES
# =========================================================
class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    read = models.BooleanField(default=False)
    
    

    class Meta:
        ordering = ["-created"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"{self.name} – {self.subject}"