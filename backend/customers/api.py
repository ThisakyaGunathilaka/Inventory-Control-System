from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from customers.models import Customer
from customers.serializer import CustomerSerializer


class CustomerListApi(APIView):
    def get(self, request):
        qs = Customer.objects.all()
        serializer = CustomerSerializer(qs, many=True)
        return Response(serializer.data)


class CustomerAddApi(APIView):
    with transaction.atomic():
        def post(self, request):
            print(request.data)
            serializer = CustomerSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


# utils
def get_customer(id):
    qs = Customer.objects.filter(id=id)
    if qs.exists():
        customer = qs.first()
        return customer
    return None


class CustomerDetailApi(APIView):
    def get(self, request, id):
        customer = get_customer(id=id)
        if customer is None:
            return Response(f"Customer with {id} is not found", status=status.HTTP_404_NOT_FOUND)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)


class CustomerEditAPI(APIView):

    def put(self, request, id):
        customer = get_customer(id=id)
        if customer is None:
            return Response(f"Customer with {id} is not found", status=status.HTTP_404_NOT_FOUND)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            print(serializer.is_valid())
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDeleteAPI(APIView):
    def delete(self, request, id):
        if request.user.is_superuser:
            customer = get_customer(id=id)
            if customer is None:
                return Response(f"Customer with {id} is not found", status=status.HTTP_404_NOT_FOUND)
            customer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
