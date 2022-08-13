from django.urls import path
from autopart.api.views import (
    CategoryListAPIView,
    ProductBrandListAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
)

app_name = 'autopart'

urlpatterns = [
    # List
    path('category/', CategoryListAPIView.as_view(), name='category_list'),
    path('pbrand/', ProductBrandListAPIView.as_view(), name='pbrand_list'),
    path('product/', ProductListAPIView.as_view(), name='product_list'),
    path('product/detail/<slug>', ProductDetailAPIView.as_view(), name='product_detail'),

]
