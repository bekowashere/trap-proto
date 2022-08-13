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

from auto.models import (
    Brand,
    Series,
    Model,
    Car
)

from auto.api.serializers import (
    BrandListSerializer,
    BrandDetailSerializer,
    SeriesDetailSerializer,
    ModelDetailSerializer,
    CarDetailSerializer,
    # LIST
    SeriesListSerializer,
    ModelListSerializer,
    # PART 2 - SEARCH BAR
    SearchBrandSerializer,
    SearchSeriesSerializer,
    SearchModelSerializer,
    SearchCarSerializer
)


class BrandListAPIView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandListSerializer


class BrandDetailAPIView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandDetailSerializer
    lookup_field = 'slug'


class SeriesListAPIView(ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesListSerializer


class SeriesDetailAPIView(RetrieveAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesDetailSerializer
    lookup_field = 'slug'


class ModelListAPIView(ListAPIView):
    queryset = Model.objects.all()
    serializer_class = ModelListSerializer


class ModelDetailAPIView(RetrieveAPIView):
    queryset = Model.objects.all()
    serializer_class = ModelDetailSerializer
    lookup_field = 'slug'


class CarDetailAPIView(RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarDetailSerializer
    lookup_field = 'slug'


# PART 2 - SEARCH BAR
class SearchBrandListAPIView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = SearchBrandSerializer


# http://127.0.0.1:8000/api/auto/search/series?brand=2
class SearchSeriesListAPIView(ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SearchSeriesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['brand']


# http://127.0.0.1:8000/api/auto/search/model?series=1
class SearchModelListAPIView(ListAPIView):
    queryset = Model.objects.all()
    serializer_class = SearchModelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['series']


# http://127.0.0.1:8000/api/auto/search/car?model=8
class SearchCarListAPIView(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = SearchCarSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['model']
