# Rest Framework Views
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)

# PERMISSIONS
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

# Rest Framework Helpers
from rest_framework.response import Response
from rest_framework import status

from order.models import OrderItem, Order
from order.api.serializers import OrderItemDetailSerializer, OrderDetailSerializer, OrderListSerializer


from django_filters.rest_framework import DjangoFilterBackend


from account.models import CustomerUser, Address
from autopart.models import Product

from django.utils.crypto import get_random_string
from django.utils.text import slugify

class OrderListAPIView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']


# http://127.0.0.1:8000/api/order/orders/?user=2
class OrderDetailAPIView(RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailSerializer
    lookup_field = 'order_key'


class OrderItemDetailAPIView(RetrieveAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemDetailSerializer
    lookup_field = 'item_key'


# CREATE ORDER
class OrderCreateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user = request.user

        total_price = data.get('total_price')
        payment_method = data.get('payment_method')
        shipping_address = data.get('shipping_address')
        shipping_method = data.get('shipping_method')
        shipping_price = data.get('shipping_price')

        customeruser = CustomerUser.objects.get(user=user)
        address = Address.objects.get(id=shipping_address)

        iso2 = address.country.iso2

        ex = False
        new_order_key = "{}-{}".format(iso2, get_random_string(9,"0123456789"))
        ex = Order.objects.filter(order_key=new_order_key).exists()
        while ex:
            new_order_key = "{}-{}".format(iso2, get_random_string(9,"0123456789"))
            ex = Order.objects.filter(order_key=new_order_key).exists()

        order_key = new_order_key



        try:
            order = Order.objects.create(
                user=customeruser,
                order_key=order_key,
                payment_method=payment_method,
                total_price=total_price,
                shipping_address=address,
                shipping_method=shipping_method,
                shipping_price=shipping_price
            )

            items = data.pop('cartItems')

            for item in items:
                product_id = item.get('id')
                product = Product.objects.get(id=product_id)

                quantity = item.get('quantity')
                price_discounted = item.get('price_discounted')
                price = quantity * price_discounted

                ex = False
                new_item_key = "{}-{}".format(order_key, get_random_string(6,"0123456789"))
                ex = OrderItem.objects.filter(item_key=new_item_key).exists()
                while ex:
                    new_item_key = "{}-{}".format(order_key, get_random_string(6,"0123456789"))
                    ex = OrderItem.objects.filter(item_key=new_order_key).exists()

                item_key = new_item_key

                
                
                OrderItem.objects.create(
                    item_key=item_key,
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=price
                )



        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Order created successfully'}, status=status.HTTP_200_OK)
