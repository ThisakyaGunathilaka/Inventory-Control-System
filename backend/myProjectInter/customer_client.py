import requests

URL = "http://127.0.0.1:8000"


def get_jwt_token():
    url = f"{URL}/api/token/"
    response = requests.post(url, data={
        'username': 'admin',
        'password': '1234',
    })
    res = response.json()
    r, a = res.get('refresh'), res.get('access')
    return r, a 


refresh, access = get_jwt_token()
print("refresh:", refresh)
print("access:", access)


def get_data():
    url = f"{URL}/customers/list/"
    headers = {'Authorization': f"Bearer {access}"}
    response = requests.get(url, headers=headers)
    customer_data = response.json()
    print(customer_data)


def create_user():
    url = f"{URL}/accounts/api/register/"
    headers = {'Authorization': f"Bearer {access}"}
    data = {
        "username": "chanuka",
        "password": "ugcugc5101",

    }
    response = requests.post(url, data=data, headers=headers)
    print(response)


get_data()
create_user()
