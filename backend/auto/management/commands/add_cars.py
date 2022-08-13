from django.core.management import BaseCommand, CommandError
import json
from auto.models import (
    Brand,
    Series,
    Model,
    Car,
    FuelTypes,
    CarSpecification,
    CarSpecificationType,
    CarSpecificationValue
)


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = '_data/auto/all_cars.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        for cars in data:
            brand = Brand.objects.get(name=cars['brand'])
            series = Series.objects.get(name=cars['series'])
            model = Model.objects.get(slug=cars['model_slug'])
            name = cars['name']

            # slug botta halledildi
            # slug ? yıl sonra bak
            # slug = slugify('{}'.format(name.replace("ı","i")))

            slug = cars['slug']

            # fuelType - ForeignKey
            _fuelType = cars['fuelType']
            if _fuelType == "":
                _fuelType = "Null"

            if FuelTypes.objects.filter(type=_fuelType).exists():
                fuelType = FuelTypes.objects.get(type=_fuelType)
            else:
                FuelTypes.objects.create(type=_fuelType)
                fuelType = FuelTypes.objects.get(type=_fuelType)

            # engine
            engine = cars['engine']
            enginePower = cars['enginePower']

            information = cars["information"]

            try:
                car = Car(
                    brand=brand,
                    series=series,
                    model=model,
                    name=name,
                    slug=slug,
                    fuelType=fuelType,
                    engine=engine,
                    enginePower=enginePower
                )

                car.save()

                self.stdout.write(self.style.SUCCESS(f'{cars["name"]} create successfully'))

                # k -> car specification type
                # v -> {}
                # x -> car specification
                # y -> value
                for k, v in information.items():
                    car_specification_type = CarSpecificationType.objects.get(name=k)
                    for x, y in v.items():
                        car_specification = CarSpecification.objects.get(name=x, cs_type=car_specification_type)
                        CarSpecificationValue.objects.create(
                            car=car,
                            specification=car_specification,
                            value=y
                        )

                self.stdout.write(self.style.SUCCESS(f'Specifications added successfully'))
            except Exception as e:
                raise CommandError(f'{e}')
