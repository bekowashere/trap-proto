from django.core.management import BaseCommand, CommandError
from auto.models import Brand, Series, BodyStyle
import json
from django.utils.text import slugify


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = '_data/auto/all_series.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        for series in data:
            brand = Brand.objects.get(name=series['brand'])
            name = series['name']

            # sonuna sayı eklemeli 1-2-3 diye artan olursa çok iyi
            slug = slugify('{}'.format(name.replace("ı", "i")))

            # images/DS AUTOMOBILES/DS AUTOMOBILES DS 3/DS AUTOMOBILES DS 3.jpg
            img_path = f'auto/{brand}/{name}/{name}.jpg'

            _bodyStyle = series['bodyStyle']
            if _bodyStyle == "":
                _bodyStyle = "Null"

            if BodyStyle.objects.filter(style=_bodyStyle).exists():
                bodyStyle = BodyStyle.objects.get(style=_bodyStyle)
            else:
                BodyStyle.objects.create(style=_bodyStyle)
                bodyStyle = BodyStyle.objects.get(style=_bodyStyle)

            isDiscontinued = series['isDiscontinued']

            try:
                Series.objects.create(
                    brand=brand,
                    name=name,
                    slug=slug,
                    image=img_path,
                    bodyStyle=bodyStyle,
                    isDiscontinued=isDiscontinued
                )
                self.stdout.write(self.style.SUCCESS(f'{series["name"]} create successfully'))
            except Exception as e:
                raise CommandError(f'{e}')
