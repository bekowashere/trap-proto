from django.core.management import BaseCommand, CommandError
from world.models import Country, Currency
import json


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = '_data/world/countries.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        for country in data:
            name = country['name']
            iso3 = country['iso3']
            iso2 = country['iso2']
            numeric_code = country['numeric_code']
            phone_code = country['phone_code']
            capital = country['capital']
            region = country['region']
            subregion = country['subregion']
            latitude = country['latitude']
            longitude = country['longitude']

            # Currency
            currency_code = country['currency']
            currency_name = country['currency_name']
            currency_symbol = country['currency_symbol']

            if Currency.objects.filter(currency_code=currency_code).exists():
                currency = Currency.objects.get(currency_code=currency_code)
            else:
                Currency.objects.create(
                    currency_code=currency_code,
                    currency_name=currency_name,
                    currency_symbol=currency_symbol
                )
                currency = Currency.objects.get(currency_code=currency_code)

            try:
                Country.objects.create(
                    name=name,
                    iso3=iso3,
                    iso2=iso2,
                    numeric_code=numeric_code,
                    phone_code=phone_code,
                    capital=capital,
                    currency=currency,
                    region=region,
                    subregion=subregion,
                    latitude=latitude,
                    longitude=longitude
                )
                self.stdout.write(self.style.SUCCESS(f'{country["name"]} create successfully'))
            except Exception as e:
                raise CommandError(f'{e}')
