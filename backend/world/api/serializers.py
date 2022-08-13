from rest_framework import serializers
from world.models import Country, Currency


class CountryListSerializer(serializers.ModelSerializer):
    """
    name, iso3, iso2, numeric_code, phone_code, capital, currency(FK), region, subregion, latitude, longitude
    """

    class Meta:
        model = Country
        fields = ('id', 'name', 'iso2')


class CurrencyListSerializer(serializers.ModelSerializer):
    """
    currency_code
    currency_name
    currency_symbol
    """

    class Meta:
        model = Currency
        fields = '__all__'
