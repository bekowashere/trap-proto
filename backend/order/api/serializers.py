from rest_framework import serializers
from order.models import OrderItem, Order
from account.models import Address, CustomerUser
from world.models import Country
from autopart.models import Product

class OrderUserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    class Meta:
        model = CustomerUser
        fields = ('username','email','first_name','last_name')

class OrderCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('id', 'iso2', 'name','region')

class OrderAddressSerializer(serializers.ModelSerializer):
    country = OrderCountrySerializer()

    class Meta:
        model = Address
        fields = '__all__'



class OrderItemProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name','slug', 'sku', 'price_discounted')

class OrderItemDetailSerializer(serializers.ModelSerializer):
    product = OrderItemProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = ('id', 'item_key', 'product', 'quantity', 'price')


class OrderDetailSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    shipping_address = OrderAddressSerializer()
    user = OrderUserSerializer()

    def get_order_items(self, obj):
        return OrderItemDetailSerializer(obj.get_all_items, many=True).data

    class Meta:
        model = Order
        fields = ('id', 'order_key', 'user', 'payment_method', 'total_price', 'shipping_address', 'shipping_method',
                  'shipping_price', 'is_paid', 'paid_at', 'is_delivered', 'delivered_at', 'created_at', 'updated_at', 'order_items')


class OrderListSerializer(serializers.ModelSerializer):
    shipping_address = OrderAddressSerializer()
    user = OrderUserSerializer()
    class Meta:
        model = Order
        fields = ('id', 'order_key', 'user', 'payment_method', 'total_price', 'shipping_address', 'shipping_method',
                  'shipping_price', 'is_paid', 'paid_at', 'is_delivered', 'delivered_at', 'created_at', 'updated_at')
