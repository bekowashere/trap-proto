from django.urls import path
from auto.api.views import (
    BrandListAPIView,
    BrandDetailAPIView,
    SeriesDetailAPIView,
    ModelDetailAPIView,
    CarDetailAPIView,
    # LIST
    SeriesListAPIView,
    ModelListAPIView,
    # PART 2 - SEARCH BAR
    SearchBrandListAPIView,
    SearchSeriesListAPIView,
    SearchModelListAPIView,
    SearchCarListAPIView

)

app_name = 'auto'

urlpatterns = [
    # List
    path('brands/', BrandListAPIView.as_view(), name='brand_list'),
    path('series/', SeriesListAPIView.as_view(), name='series_list'),
    path('models/', ModelListAPIView.as_view(), name='model_list'),

    path('brand/detail/<slug>', BrandDetailAPIView.as_view(), name='brand_detail'),
    path('series/detail/<slug>', SeriesDetailAPIView.as_view(), name='series_detail'),
    path('model/detail/<slug>', ModelDetailAPIView.as_view(), name='model_detail'),
    path('car/detail/<slug>', CarDetailAPIView.as_view(), name='car_detail'),

    # PART 2 - SEARCH BAR
    path('search/brands', SearchBrandListAPIView.as_view(), name='search_brand_list'),
    path('search/series', SearchSeriesListAPIView.as_view(), name='search_series_list'),
    path('search/model', SearchModelListAPIView.as_view(), name='search_model_list'),
    path('search/car', SearchCarListAPIView.as_view(), name='search_car_list'),

]
