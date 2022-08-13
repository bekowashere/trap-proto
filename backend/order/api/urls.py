from django.urls import path
from order.api.views import (
    OrderListAPIView,
    OrderDetailAPIView,
    OrderItemDetailAPIView,
    OrderCreateAPIView,
)

app_name = 'order'

urlpatterns = [
    path('orders/', OrderListAPIView.as_view(), name='order_list'),
    path('orders/detail/<order_key>/', OrderDetailAPIView.as_view(), name='order_detail'),
    path('items/detail/<item_key>/', OrderItemDetailAPIView.as_view(), name='item_detail'),

    # functions
    path('create/', OrderCreateAPIView.as_view(), name='order_create'),

]
