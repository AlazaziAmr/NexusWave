import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class ServiceCategory(models.Model):
    name = models.CharField(max_length=200)
    code = models.SlugField(allow_unicode=False)
    active = models.BooleanField(default=True, verbose_name=_("Active"))

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        if self.code and ServiceCategory.objects.filter(code=self.code).exclude(pk=self.pk).exists():
            raise ValidationError({"code": _("Service Category Code Already Exists, please use another code.")})


class Service(models.Model):
    name = models.CharField(max_length=200)
    code = models.SlugField(allow_unicode=False, default=uuid.uuid4)
    price = models.FloatField(default=0)
    note = models.TextField(_("Description"), default="", blank=True)
    active = models.BooleanField(default=True, verbose_name=_("Active"))
    category = models.ForeignKey(ServiceCategory, on_delete=models.PROTECT, null=True)
    one_time_service = models.BooleanField(default=True)
    subscrition = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class CustomerRequest(models.Model):
    class RequestStatus(models.TextChoices):
        WAITING = "waiting", _("Waiting")
        REVIEW = "review", _("Review")
        Done = "done", _("Done")
        CANCEL = "cancel", _("Cancel")

    class RequestType(models.TextChoices):
        ONETIME = "one_time", _("طلب خدمة لمرة واحدة")
        SUBSCRIPTION = "subscrition", _("اشتراك  سنوي")

    name = models.CharField(max_length=200, verbose_name="اسمك ", help_text="ُاكتب اسمك او عنوان الطلب")
    email = models.EmailField(max_length=254, verbose_name="ايميلك ", help_text="ُاكتب ايميلك ليتم التواصل معك")
    phone = models.CharField(max_length=20, verbose_name="رقم الهاتف ", help_text="")
    company = models.CharField(max_length=300, verbose_name="اسم المؤسسة /الشركة", help_text="")
    category = models.ForeignKey(ServiceCategory, on_delete=models.PROTECT, null=True, blank=True)
    services = models.ManyToManyField(Service)
    slug = models.SlugField(unique=True, db_index=True, default=uuid.uuid4, editable=False, blank=True)
    ip_address = models.GenericIPAddressField("IP", blank=True, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    state = models.CharField(
        verbose_name=_("Status"),
        max_length=10,
        choices=RequestStatus.choices,
        default=RequestStatus.WAITING,
    )
    active = models.BooleanField(default=True, verbose_name=_("Active"))

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # if not self.slug :
        #     self.slug = self.unique_slug_generator()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("website:request-service-detail", kwargs={"slug": self.slug})

    def unique_slug_generator(self):
        constant_slug = slugify(self.phone)
        slug = constant_slug
        num = 0
        Klass = self.__class__
        while Klass.objects.filter(slug=slug).exists():
            num += 1
            slug = "{slug}-{num}".format(slug=constant_slug, num=num)
        return slug
