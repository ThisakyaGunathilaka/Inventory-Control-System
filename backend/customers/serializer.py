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

        address_set_data = validated_data.pop('address_set')
        customer = Customer.objects.create(**validated_data)
        for address in address_set_data:
            Address.objects.create(customer=customer, **address)
        return customer

    def update(self, instance, validated_data):
        address_set_data = validated_data.pop('address_set')
        instance.name = validated_data.get('name', instance.name)
        instance.telephone = validated_data.get('telephone', instance.telephone)
        qs = instance.address_set.all()
        if len(address_set_data) == qs.count():
            count = 0
            for address in address_set_data:
                address_obj = qs[count]
                address_obj.address = address.get('address')
                address_obj.save()
                print(qs[count].address)
                count = count + 1
        instance.save()
        return instance

# newkama = {
#     'name': 'newton pahandeepa',
#     'telephone': '1234',
#     'address_set': [
#         {'address': 'C11/Gsdfsdfment Housing Scheme'},
#         {'address': 'C11/sdfsdfsd'}
#     ]
# }
