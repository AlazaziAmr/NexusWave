from django.urls import include, path

from . import views

app_name = "website"

urlpatterns = [ 
    path("", views.HomeView.as_view(), name="website_index"),
    path("erp-solutions/", views.ERPView.as_view(), name="website_erp"),
    path("about/", views.AboutView.as_view(), name="website_about"),
    path("contact/", views.ContactView.as_view(), name="website_contact"),
    path("services/", views.ServicesView.as_view(), name="website_service"),
    path("social-media-management/", views.SmmView.as_view(), name="website_social"),
    path("website-dev/", views.WebsiteDevView.as_view(), name="website_web_development"),
    path("website-hosting/", views.WebHostingView.as_view(), name="website_hosting"),
    path("graphic-design/", views.GraphicDesignView.as_view(), name="website_graphic_design"),
    path("request-service/", views.ServicerCreateView.as_view(), name="contact-service"),
    path("request-service/<slug:category>/", views.ServicerCreateView.as_view(), name="request-service"),
    path("thanks/", views.ContactServiceDetails.as_view(), name="contact-thanks"),
    path("thanks/<slug:slug>/", views.RequestServiceDetails.as_view(), name="request-service-detail"),
    path("digital-marketing/", views.DmView.as_view(), name="website_digital_marketing"),
    path("company-privacy/", views.CompanyPrivacy.as_view(), name="website_privacy"),
    path("company-rules/", views.CompanyRules.as_view(), name="website_rules"),
]