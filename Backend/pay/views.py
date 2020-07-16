import json

import uuid
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Paysafe_user

headers = {
    'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
    'Simulator': 'EXTERNAL',
    'Content-Type': 'application/json'
}
response_headers = {
    "Access-Control-Allow-Origin": "*"
}


class Pay(APIView):

    def get(self, request):
        return Response(data="Please try valid methods")

    # return singleusetoken
    def post(self, request):
        data = request.data
        obj, created = Paysafe_user.objects.get_or_create(
            cog_id=data["cogid"]
        )
        print(data)
        # return Response(data=data, status=200, headers=response_headers)
        if created:
            obj.paysafe_id = self.generatecustomerid(obj.cog_id, data)
            obj.save()
        print(obj)
        token = self.generatesingleUseToken(obj)
        return Response(data={"token": token,"uuid":uuid.uuid4()}, status=200, headers=response_headers)

    # return pay
    def patch(self, request):
        data = request.data
        print(data)
        response = self.startpay(data)
        return Response(data=response, status=200, headers=response_headers)

    def generatecustomerid(self, cog_id, data):
        values = {
            "merchantCustomerId": cog_id,
            "firstName": data["name"],
            "email": data["email"],
            "phone": data["phone"],
        }

        url = 'https://api.test.paysafe.com/paymenthub/v1/customers'
        response = requests.request("POST", url, headers=headers, data=json.dumps(values))
        print("custid", response.json())
        return response.json()["id"]

    def generatesingleUseToken(self, obj):
        values = {
            "merchantRefNum": "Ref123",
            "paymentTypes": [
                "CARD"
            ]
        }
        print(values)
        print(obj.paysafe_id)
        url = 'https://api.test.paysafe.com/paymenthub/v1/customers/' + str(obj.paysafe_id) + '/singleusecustomertokens'
        response = requests.request("POST", url, headers=headers, data=json.dumps(values))
        print("token", url, response.json())
        return response.json()["singleUseCustomerToken"]

    def startpay(self, data):
        values = {
            "merchantRefNum": str(uuid.uuid4()),
            "amount": data["amount"],
            "currencyCode": "USD",
            "paymentHandleToken": data["token"],
            "description": "Assignment check"
        }
        print(values)
        url = 'https://api.test.paysafe.com/paymenthub/v1/payments'
        response = requests.request("POST", url, headers=headers, data=json.dumps(values))
        print(response.text)
        return response.json()
