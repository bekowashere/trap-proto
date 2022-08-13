# Rest Framework Views
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)

# Rest Framework Filters
import django_filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Rest Framework Helpers
from rest_framework.response import Response
from rest_framework import status

from autopart.models import (
    Category,
    ProductBrand,
    Product,
)

from autopart.api.serializers import (
    CategoryListSerializer,
    ProductBrandListSerializer,
    ProductListSerializer,
    ProductDetailSerializer
)

from autopart.api.paginations import ProductPagination


class CategoryListAPIView(ListAPIView):
    serializer_class = CategoryListSerializer

    def get_queryset(self):
        return Category.objects.filter(parent=None)


class ProductBrandListAPIView(ListAPIView):
    queryset = ProductBrand.objects.all()


# 200 OK
# category - model 400 BAD REQUEST
class ProductListAPIView(ListAPIView):
    # filter is_active
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'compatible_cars__id']


class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'
