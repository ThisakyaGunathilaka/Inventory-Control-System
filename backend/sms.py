from twilio.rest import Client


account_sid = 'AC54385438282cd809a683a843a1846ddc'
auth_token = "ec68bbd3609bf7608917325315844e8d"

client = Client(account_sid, auth_token)

try:
    message = client.messages.create(
        to="+94770783209",
        from_="+13345092858",
        body="Hello from Python!")
except Exception as e:
    print(e.__doc__)
else:
    print(message.sid)
