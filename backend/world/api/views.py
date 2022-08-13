from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from world.models import Country, Currency
from world.api.serializers import CountryListSerializer, CurrencyListSerializer
import json


class CountryListAPIView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryListSerializer


class StateListAPIView(APIView):

    def get(self, request):
        file_path = '_data/world/states.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        country_code = self.request.query_params.get('country_code')
        # http://127.0.0.1:8000/api/world/cities/?country_code=TR

        queryset = []
        if country_code is not None:
            for state in data:
                if state['country_code'] == country_code:
                    queryset.append(state)
            return Response(queryset)

        return Response(data)


class CityListAPIView(APIView):

    def get(self, request):
        file_path = '_data/world/cities.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        country_code = self.request.query_params.get('country_code')
        state_code = self.request.query_params.get('state_code')
        # http://127.0.0.1:8000/api/world/cities/?country_code=TR&state_code=34

        queryset = []
        if country_code is not None and state_code is not None:
            for city in data:
                if city['country_code'] == country_code and city['state_code'] == state_code:
                    queryset.append(city)
            return Response(queryset)

        return Response(data)


# CURRENCY
class CurrencyListAPIView(ListAPIView):
    queryset = Currency.objects.all()
    serializer_class = CurrencyListSerializer
