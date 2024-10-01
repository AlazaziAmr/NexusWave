 

from django import forms

from website.models import CustomerRequest, Service

class RequestServiceForm(forms.ModelForm):
    """Form definition for PaymentVoucher."""

     
    services = forms.ModelMultipleChoiceField(
        queryset=Service.objects.filter(active=True),required=False,
        widget=forms.CheckboxSelectMultiple(),
    )

    class Meta:
        """Meta definition for PaymentVoucher."""

        model = CustomerRequest
        exclude = ("state","active",)
