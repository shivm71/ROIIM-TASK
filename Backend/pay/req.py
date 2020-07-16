import requests
import json
url = "https://api.test.paysafe.com/paymenthub/v1/customers"

payload = {'merchantCustomerId': 'us-2:7b6caf86-76c1-4f95-bda1-d0f2d8e44618', 'name': 'Shivam', 'email': 'shivamshah71@gmail.com', 'phone': '+917828871116'}

headers = {
    'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
    'Simulator': 'EXTERNAL',
    'Content-Type': 'application/json'
}
data = json.dumps(payload)
response = requests.request("POST", url, headers=headers, data =data)


print(response.json())
