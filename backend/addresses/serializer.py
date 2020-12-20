from rest_framework import serializers
from addresses.models import Address


class AddressSerialier(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address']
