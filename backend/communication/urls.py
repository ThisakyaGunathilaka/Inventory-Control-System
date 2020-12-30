from django.urls import path
from communication.api import SendEmailApi, SendSMSApi


app_name = 'communication'
urlpatterns = [
    path('send_email/', SendEmailApi.as_view(), name='send-email'),
    path('send_sms/', SendSMSApi.as_view(), name='send-sms'),
]
