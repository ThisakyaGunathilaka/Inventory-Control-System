import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from smtplib import SMTPAuthenticationError

from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from communication.serializers import SendEmailSerializer
from errors.models import Exceptions

fromaddr = settings.ADMIN_EMAIL


class SendEmailApi(APIView):
    def post(self, request):
        email_serializer = SendEmailSerializer(data=request.data)
        if email_serializer.is_valid():
            toaddr = email_serializer.validated_data.get('email_receiver')
            email = smtplib.SMTP('smtp.gmail.com', 587)
            message = MIMEMultipart()
            message['From'] = fromaddr
            message['To'] = toaddr
            message['Subject'] = email_serializer.validated_data.get('subject')
            body = email_serializer.validated_data.get('message')
            message.attach(MIMEText(body, 'plain'))
            message = message.as_string()

            # TLS for security
            email.starttls()

            try:
                email.login(fromaddr, "luffy@5101")
                email.sendmail(fromaddr, toaddr, message)
                print("email sent successfully")
                email.quit()
            except SMTPAuthenticationError:
                Exceptions.objects.create(SMTPAuthenticationError.__doc__)
            except Exception as e:
                Exceptions.objects.create(e.__doc__)
            else:
                email_serializer.save()
            print(email_serializer.data)
            return Response(email_serializer.data, status=status.HTTP_201_CREATED)
        return Response(email_serializer.data, status=status.HTTP_400_BAD_REQUEST)
