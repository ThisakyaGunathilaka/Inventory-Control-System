from rest_framework import serializers

from communication.models import SendSMS, SendEmail


class SendSMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = SendSMS
        fields = ['number', 'message']


class SendEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SendEmail
        fields = ['email_receiver', 'subject', 'message']
