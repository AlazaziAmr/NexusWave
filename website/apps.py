from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WebSiteConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "website"
    verbose_name = _("Website Design")
   