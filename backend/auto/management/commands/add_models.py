from django.core.management import BaseCommand, CommandError
import json
from django.utils.text import slugify
from auto.models import (
    Brand,
    Series,
    Model,
    Segment,
    FuelTypes,
    ModelImages
)


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = '_data/auto/all_models.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        for models in data:
            brand = Brand.objects.get(name=models['brand'])
            series = Series.objects.get(name=models['series'])
            name = models['name']

            # with years
            _startYear = models['startYear']
            _endYear = models['endYear']

            # images/DS AUTOMOBILES/DS AUTOMOBILES DS 3/DS 3-2014-2016.jpg
            img_folder_name = f'{name}-{_startYear}-{_endYear}'
            img_path = f'auto/{models["brand"]}/{models["series"]}/{img_folder_name}/{img_folder_name}.jpg'

            # year check and conver data type (int)
            startYear = int(_startYear)
            if _endYear == "Present":
                endYear = 2022
            else:
                endYear = int(_endYear)

            # slug
            _slug = slugify('{}'.format(name.replace("ı", "i")))
            slug = f'{_slug}-{startYear}-{endYear}'

            # segment
            _segment = models['segment']

            if Segment.objects.filter(name=_segment).exists():
                segment = Segment.objects.get(name=_segment)
            else:
                Segment.objects.create(name=_segment)
                segment = Segment.objects.get(name=_segment)

            # description
            description = models['description']

            try:

                model = Model(
                    brand=brand,
                    series=series,
                    name=name,
                    slug=slug,
                    image=img_path,
                    startYear=startYear,
                    endYear=endYear,
                    segment=segment,
                    description=description
                )

                model.save()

                # fuelType
                fuelTypes = models['fuelType']
                for f_type in fuelTypes:
                    fuel = f_type['type']

                    if fuel == "":
                        fuel = "Null"

                    if FuelTypes.objects.filter(type=fuel).exists():
                        fueltype = FuelTypes.objects.get(type=fuel)
                        model.fuelType.add(fueltype)
                    else:
                        FuelTypes.objects.create(type=fuel)
                        fueltype = FuelTypes.objects.get(type=fuel)
                        model.fuelType.add(fueltype)

                model.save()

                # Model image
                for index, detail_url in enumerate(models['images_url'], start=1):
                    model_img_path = f'auto/{models["brand"]}/{models["series"]}/{img_folder_name}/{img_folder_name}_{index}.jpg'
                    model_alt_text = f'{models["brand"]}/{models["series"]}/{img_folder_name}/{img_folder_name}_{index}'

                    ModelImages.objects.create(
                        model=model,
                        alt_text=model_alt_text,
                        image=model_img_path
                    )

                self.stdout.write(self.style.SUCCESS(f'{models["name"]} create successfully'))
            except Exception as e:
                raise CommandError(f'{e}')
