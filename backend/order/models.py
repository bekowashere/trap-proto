from django.db import models
from account.models import CustomerUser
from account.models import Address
from autopart.models import Product
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name="user_orders")
    order_key = models.CharField(max_length=128)
    payment_method = models.CharField(max_length=64, blank=True, null=True)
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True
    )
    shipping_address = models.ForeignKey(Address, on_delete=models.SET_NULL, blank=True, null=True)
    shipping_method = models.CharField(max_length=64, blank=True, null=True )
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True
    )
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def get_all_items(self):
        return self.items.all()

    def __str__(self):
        return self.order_key

    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')


class OrderItem(models.Model):
    item_key = models.CharField(max_length=128, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_order_items")
    quantity = models.PositiveIntegerField(default=1, blank=True, null=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True
    )

    def __str__(self):
        return self.item_key

    class Meta:
        verbose_name = _('Order Item')
        verbose_name_plural = _('Order Items')