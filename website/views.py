from django.apps import apps
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context
from django.template.loader import get_template
from django.urls import reverse
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView
from django_mail_admin import mail, models
from pyexpat.errors import messages

from website.forms import RequestServiceForm
from website.models import CustomerRequest


class HomeView(TemplateView):
    template_name = "website/coretech/index.html"


class ERPView(TemplateView):
    template_name = "website/coretech/erp_solutions.html"


class AboutView(TemplateView):
    template_name = "website/coretech/about.html"


class ContactView(TemplateView):
    template_name = "website/coretech/contact.html"


class ServicesView(TemplateView):
    template_name = "website/coretech/services.html"

class SmmView(TemplateView):
    template_name = "website/coretech/social_media_management.html"

class WebsiteDevView(TemplateView):
    template_name = "website/coretech/website_development.html"

class WebHostingView(TemplateView):
    template_name = "website/coretech/website_hosting.html"


class GraphicDesignView(TemplateView):
    template_name = "website/coretech/graphic_design.html"

class DmView(TemplateView):
    template_name = "website/coretech/digital_marketing.html"

class CompanyPrivacy(TemplateView):
    template_name = "website/coretech/privacy.html"

class CompanyRules(TemplateView):
    template_name = "website/coretech/rules.html"


class ContactServiceDetails(TemplateView):
    template_name = "website/coretech/thanks.html"


from django.utils import timezone
from django.views.generic.detail import DetailView


def get_client_ip_address(request):
    req_headers = request.META
    x_forwarded_for_value = req_headers.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for_value:
        ip_addr = x_forwarded_for_value.split(",")[-1].strip()
    else:
        ip_addr = req_headers.get("REMOTE_ADDR")
    return ip_addr


class RequestServiceDetails(DetailView):
    template_name = "website/coretech/thanks.html"
    model = CustomerRequest


class ServicerCreateView(CreateView):
    # model = ContactServiceEntry
    form_class  = RequestServiceForm
    # fields = "__all__"
    template_name = 'website/coretech/contact_services.html'
    
    # success_url = '/thanks/'
    
    def _get_default_services(self):
        category_code = self.kwargs.get("category",None)
        services = apps.get_model("website.Service").objects.filter(active=True)
        if category_code:
            category = apps.get_model("website.ServiceCategory").objects.filter(code = category_code).first()
            if category:
                services = services.filter(category = category)
        return services

    
    def get_form(self, form_class = None):
        form = super().get_form(form_class)
        if form.fields and form.fields.get("services",None):
            form.fields['services'].queryset = self._get_default_services()
        return form
    
    def _send_email(self,form):
        try:
            obj = form.instance
            services = form.cleaned_data.get("services",[]) or []
            subject, from_email, to = f"You have a new request from {obj.company}", "dev@core-tech.sa", "info@core-tech.sa"
            plain_tmpl = get_template('website/email/email.txt')
            html_tmpl     = get_template('website/email/email.html')
            ctx = { 'username': "CoreTech" ,"obj":obj,"services":services}
            text_content = plain_tmpl.render(ctx)
            html_content = html_tmpl.render(ctx)
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=True)
            # print(msg.send())

            # msg = EmailMessage(subject, html_content, from_email, [to])
            # msg.content_subtype = "html"  # Main content is now text/html
            # msg.send()
        except Exception as ex:
            print(ex)

    def form_valid(self, form):
        form.instance.ip_address = get_client_ip_address(self.request)
        result = super().form_valid(form)
        self._send_email(form)
        return result
    
