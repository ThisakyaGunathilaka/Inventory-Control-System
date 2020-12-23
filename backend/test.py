# Sending emails without attachments using Python.
# importing the required library. 
import smtplib
from email.mime.text import MIMEText
from smtplib import SMTPAuthenticationError
from email.mime.multipart import MIMEMultipart

fromaddr = "3rule57@gmail.com"
toaddr = "zorojurio@gmail.com"
email = smtplib.SMTP('smtp.gmail.com', 587)
message = MIMEMultipart()
message['From'] = fromaddr
message['To'] = toaddr
message['Subject'] = "subject_of_the_mail"
body = "body_of_the_mail"
message.attach(MIMEText(body, 'plain'))
message = message.as_string()

# TLS for security
email.starttls()

# authentication
# compiler gives an error for wrong credential. 
try:
    email.login(fromaddr, "luffy@5101")
    email.sendmail(fromaddr, toaddr, message)
    print("email sent successfully")
    email.quit()
except SMTPAuthenticationError:
    print(SMTPAuthenticationError.__doc__)
except Exception as e:
    print(e.__doc__)
