from django.db import models


class SendSMS(models.Model):
    number = models.IntegerField(blank=True, null=True)
    message = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.number


class SendEmail(models.Model):
    email_receiver = models.EmailField(blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.email_receiver
