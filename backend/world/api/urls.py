from django.urls import path
from world.api.views import CountryListAPIView, StateListAPIView, CityListAPIView, CurrencyListAPIView

app_name = 'world'

urlpatterns = [
    # List
    path('countries/', CountryListAPIView.as_view(), name='country_list'),

    #
    path('states/', StateListAPIView.as_view(), name='state_list'),
    path('cities/', CityListAPIView.as_view(), name='city_list'),

    # Currency
    path('currency/', CurrencyListAPIView.as_view(), name='currency_list'),

]
