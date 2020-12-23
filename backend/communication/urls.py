from django.urls import path
from communication.api import SendEmailApi


app_name = 'communication'
urlpatterns = [
    path('send_email/', SendEmailApi.as_view(), name='send-email')
]
