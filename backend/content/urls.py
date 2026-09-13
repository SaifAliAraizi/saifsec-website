from django.urls import path
from . import views

urlpatterns = [
    path("site/", views.SiteConfigView.as_view()),
    path("experience/", views.ExperienceList.as_view()),
    path("certifications/", views.CertificationList.as_view()),
    path("courses/", views.CourseList.as_view()),
    path("courses/<slug:slug>/", views.CourseDetail.as_view()),
    path("services/", views.ServiceList.as_view()),
    path("labs/", views.LabList.as_view()),
    path("labs/<slug:slug>/", views.LabDetail.as_view()),
    path("writeups/", views.WriteupList.as_view()),
    path("contact/", views.ContactCreate.as_view()),
]