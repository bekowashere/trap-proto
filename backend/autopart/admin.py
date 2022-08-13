from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from mptt.admin import MPTTModelAdmin, DraggableMPTTAdmin
from autopart.models import Category, ProductBrand, Product, OEMCode, ProductSpecificationValue


@admin.register(Category)
class CategoryMPTTAdmin(DraggableMPTTAdmin):
    fieldsets = (
        (_('Category Information'), {'fields': ('name', 'slug', 'image')}),
        (_('Parent'), {'fields': ('parent',)}),
        (_('Description'), {'fields': ('description',)}),
    )

    mptt_indent_field = 'name'
    mptt_level_indent = 50
    list_display = ('tree_actions', 'indented_title', 'related_products_count', 'related_products_cumulative_count')

    def get_queryset(self, request):
        qs = super(CategoryMPTTAdmin, self).get_queryset(request)

        # Add cumulative product count
        qs = Category.objects.add_related_count(
            qs,
            Product,
            'category',
            'products_cumulative_count',
            cumulative=True
        )

        # Add non cumulative product count
        qs = Category.objects.add_related_count(
            qs,
            Product,
            'category',
            'products_count',
            cumulative=False
        )
        return qs

    # Just parent category products count
    def related_products_count(self, instance):
        return instance.products_count

    related_products_count.short_description = 'Parent category products'

    # Parent category and subcategories product count
    def related_products_cumulative_count(self, instance):
        return instance.products_cumulative_count

    related_products_cumulative_count.short_description = 'Products'


class OEMCodeInline(admin.TabularInline):
    model = OEMCode


class ProductSpecificationValueInline(admin.TabularInline):
    model = ProductSpecificationValue


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Basic Information'), {'fields': ('name', 'slug', 'image')}),
        (_('ForeignKey'), {'fields': ('category', 'product_brand', 'supplier')}),
        (_('Product Information'), {'fields': ('sku', 'stock', 'moq', 'weight')}),
        (_('Price'), {'fields': ('price_net', 'price_discounted', 'discount_percentage')}),
        (_('Features'), {'fields': ('is_active', 'is_new')}),
        (_('Cars'), {'fields': ('compatible_cars',)}),
        (_('Metadata'), {'fields': ('created_date', 'updated_date')}),

    )

    list_display = ('name', 'category', 'supplier')
    list_filter = ('is_active', 'is_new')
    search_fields = ('name', 'category__name__icontains', 'supplier__company_name__icontains')
    readonly_fields = ('created_date', 'updated_date', 'discount_percentage')
    filter_horizontal = ('compatible_cars',)

    inlines = [
        OEMCodeInline,
        ProductSpecificationValueInline
    ]


@admin.register(ProductBrand)
class ProductBrandAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Brand Information'), {'fields': ('name', 'slug', 'image', 'status')}),
        (_('Description'), {'fields': ('description',)}),
    )

    list_display = ('name', 'status')
    search_fields = ('name',)
