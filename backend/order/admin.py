from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from order.models import OrderItem, Order


class OrderItemInline(admin.TabularInline):
    model = OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Order Information'), {'fields': ('user', 'order_key')}),
        (_('Payment Information'), {'fields': ('payment_method', 'total_price', 'is_paid','paid_at')}),
        (_('Shipping Information'), {'fields': ('shipping_address', 'shipping_method', 'shipping_price','is_delivered','delivered_at')}),
        (_('Metadata Information'), {'fields': ('created_at','updated_at')}),
    )

    readonly_fields = ('created_at','updated_at')
    list_display = ('order_key', 'user','is_paid','is_delivered')
    # payment_method & shipping method add list_filter
    list_filter = ('is_paid','is_delivered')
    search_fields = ('user__user__email','order_key')

    inlines = [
        OrderItemInline
    ]


admin.site.register(OrderItem)