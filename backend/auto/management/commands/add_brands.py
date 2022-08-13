from django.core.management import BaseCommand, CommandError
from auto.models import Brand
import json
from django.utils.text import slugify


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = '_data/auto/brands.json'

        with open(file_path, 'r', encoding="UTF-8") as f:
            data = json.load(f)

        for brand in data:
            name = brand['name']
            slug = slugify('{}'.format(name.replace("ı", "i")))
            image = f'brands_logo/{name}.jpg'
            description = brand['description']

            try:
                Brand.objects.create(
                    name=name,
                    slug=slug,
                    image=image,
                    description=description
                )
                self.stdout.write(self.style.SUCCESS(f'{brand["name"]} create successfully'))
            except Exception as e:
                raise CommandError(f'{e}')
