from django.contrib import admin

from website.models import  CustomerRequest, Service,ServiceCategory
from import_export.admin import ImportExportModelAdmin


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(ImportExportModelAdmin):
    list_display=("name","code","active",)
    list_filter = ("active",)
    search_fields = ("name","code")


@admin.register(Service)
class ServiceAdmin(ImportExportModelAdmin):
    list_display=("name","code","price","note","category","one_time_service","subscrition","active",)
    list_filter = ("active",)
    search_fields = ("name","code")
    

@admin.register(CustomerRequest)
class CustomerRequestAdmin(admin.ModelAdmin):
    list_display=("name","email","phone","company",
                  "ip_address","create_at","state","active")
    list_filter = ("state","create_at","active")
    search_fields = ("email","phone")
  