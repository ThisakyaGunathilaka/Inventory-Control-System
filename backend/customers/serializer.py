from collections import OrderedDict

from rest_framework import serializers

from addresses.models import Address
from addresses.serializer import AddressSerialier
from customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    address_set = AddressSerialier(many=True)

    class Meta:
        model = Customer
        fields = ('id', 'name', 'telephone', 'address_set')

    def create(self, validated_data):
        print("Creating")
        address_set_data = validated_data.pop('address_set')
        customer = Customer.objects.create(**validated_data)
        for address in address_set_data:
            Address.objects.create(customer=customer, **address)
        return customer


newkama = {
    'name': 'newton pahandeepa',
    'telephone': '1234',
    'address_set': [
        {'address': 'C11/Gsdfsdfment Housing Scheme'},
        {'address': 'C11/sdfsdfsd'}
    ]
}
