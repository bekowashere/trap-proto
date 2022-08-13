from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# MODELS
from account.models import User, CustomerUser, SupplierUser, Address


# USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_customer', 'is_supplier')


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        # return str(token)
        return str(token.access_token)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'is_active', 'is_customer', 'is_supplier', 'token'
        )


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'address_name')

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


# CUSTOMER DETAIL
class CustomerUserDetailSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    default_shipping_address = AddressSerializer()
    default_billing_address = AddressSerializer()

    def get_email(self, obj):
        return obj.user.email

    def get_username(self, obj):
        return obj.user.username

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    class Meta:
        model = CustomerUser
        fields = (
            'user', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'default_shipping_address',
            'default_billing_address'
        )
