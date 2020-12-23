from django.contrib import admin
from communication.models import SendEmail, SendSMS


admin.site.register(SendSMS)
admin.site.register(SendEmail)

