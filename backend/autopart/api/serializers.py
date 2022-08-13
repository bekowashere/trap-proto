from rest_framework import serializers
from autopart.models import (
    Category,
    ProductBrand,
    Product,
    ProductSpecificationValue,
    OEMCode
)

from auto.models import Car
from account.models import SupplierUser
from measurement.measures import Weight


class CategoryListSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    def get_children(self, obj):
        if obj.any_children:
            return CategoryListSerializer(obj.get_all_children(), many=True).data

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'image', 'parent', 'children')


class ProductBrandListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBrand
        fields = ('id', 'name', 'slug')


# LIST
class ProductListCarSerializer(serializers.ModelSerializer):
    model = serializers.SerializerMethodField()

    def get_model(self, obj):
        return obj.model.id

    class Meta:
        model = Car
        fields = ('model', 'id')


class ProductListSerializer(serializers.ModelSerializer):
    product_brand = ProductBrandListSerializer()
    discount_percentage = serializers.SerializerMethodField()
    compatible_cars = ProductListCarSerializer(read_only=True, many=True)

    def get_discount_percentage(self, obj):
        return obj.discount_percentage

    class Meta:
        model = Product
        fields = (
            'category', 'product_brand', 'id', 'name', 'slug', 'image', 'sku', 'stock', 'price_net', 'price_discounted',
            'discount_percentage', 'is_new', 'compatible_cars'
        )
        


# DETAIL
class ProductDetailCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class ProductDetailSupplierSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    def get_id(self, obj):
        return obj.user.id

    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email

    class Meta:
        model = SupplierUser
        fields = ('id', 'company_name', 'username', 'email')


class ProductDetailCompatibleCarsSerializer(serializers.ModelSerializer):
    brand = serializers.SerializerMethodField()
    series = serializers.SerializerMethodField()
    model = serializers.SerializerMethodField()
    body_style = serializers.SerializerMethodField()
    start_year = serializers.SerializerMethodField()
    end_year = serializers.SerializerMethodField()
    fuelType = serializers.SerializerMethodField()

    def get_brand(self, obj):
        return obj.brand.name

    def get_series(self, obj):
        return obj.series.name

    def get_model(self, obj):
        return obj.model.name

    def get_start_year(self, obj):
        return obj.model.startYear

    def get_end_year(self, obj):
        return obj.model.endYear

    def get_body_style(self, obj):
        return obj.series.bodyStyle.style

    def get_fuelType(self, obj):
        return obj.fuelType.type

    class Meta:
        model = Car
        fields = (
            'id', 'name', 'slug', 'brand', 'series', 'model', 'body_style', 'start_year', 'end_year', 'fuelType',
            'engine', 'enginePower'
        )


class ProductOEMCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OEMCode
        fields = ('brand_name', 'code')


class ProductSpecificationValueSerializer(serializers.ModelSerializer):
    specification = serializers.SerializerMethodField()

    def get_specifcation(self, obj):
        return obj.specification.name

    class Meta:
        model = ProductSpecificationValue
        fields = ('specification', 'value')


class ProductDetailSerializer(serializers.ModelSerializer):
    category = ProductDetailCategorySerializer()
    product_brand = ProductBrandListSerializer()
    supplier = ProductDetailSupplierSerializer()
    discount_percentage = serializers.SerializerMethodField()
    weight_value = serializers.SerializerMethodField()
    weight_unit = serializers.SerializerMethodField()
    compatible_cars = ProductDetailCompatibleCarsSerializer(read_only=True, many=True)
    specifications = serializers.SerializerMethodField()
    oem_codes = serializers.SerializerMethodField()

    def get_discount_percentage(self, obj):
        return obj.discount_percentage

    def get_weight_value(self, obj):
        if obj.weight:
            return obj.weight.value
        return None

    def get_weight_unit(self, obj):
        if obj.weight:
            return obj.weight.unit
        return None

    def get_specifications(self, obj):
        return ProductSpecificationValueSerializer(obj.get_all_specifications(), many=True).data

    def get_oem_codes(self, obj):
        return ProductOEMCodeSerializer(obj.get_all_codes(), many=True).data

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'slug', 'image', 'description', 'category', 'product_brand', 'supplier', 'sku', 'stock',
            'moq', 'weight_value', 'weight_unit', 'price_net', 'price_discounted', 'discount_percentage', 'is_new',
            'compatible_cars', 'specifications', 'oem_codes'
        )
        
