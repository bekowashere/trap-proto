from django.db import models
import datetime
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator


# HELPERS
class FuelTypes(models.Model):
    type = models.CharField(_('Fuel Type'), max_length=64)

    def __str__(self):
        return self.type

    class Meta:
        verbose_name = _('Fuel Type')
        verbose_name_plural = _('Fuel Types')


class BodyStyle(models.Model):
    style = models.CharField(_('Body Style'), max_length=64)
    note = models.CharField(
        _('Extra Note'),
        max_length=255,
        help_text='(spider/spyder, cabrio/cabriolet, drop/open/soft top)',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.style

    class Meta:
        verbose_name = _('Body Style')
        verbose_name_plural = _('Body Style')


class Segment(models.Model):
    name = models.CharField(_('Segment Name'), max_length=64)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Segment')
        verbose_name_plural = _('Segments')


# Image Functions
def upload_brand_image(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return '{}/{}/{}.{}'.format('brands', instance.name, 'logo', extension)


def upload_series_image(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return '{}/{}/{}/{}.{}'.format('brands', instance.brand.name, instance.name, instance.name, extension)


def upload_model_image(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return '{}/{}/{}/{}/{}.{}'.format('brands', instance.series.brand.name, instance.series.name, instance.name,
                                      instance.name, extension)


class Brand(models.Model):
    name = models.CharField(_('Brand Name'), max_length=64, unique=True)
    slug = models.SlugField()
    image = models.ImageField(upload_to=upload_brand_image, validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return ''

    def get_total_series_count(self):
        series = self.brand_series.all().count()
        return series

    @property
    def get_continued_series(self):
        return self.brand_series.filter(isDiscontinued=False)

    def get_continued_count(self):
        series = self.brand_series.filter(isDiscontinued=False).count()
        return series

    @property
    def get_discontinued_series(self):
        return self.brand_series.filter(isDiscontinued=True)

    def get_discontinued_count(self):
        series = self.brand_series.filter(isDiscontinued=True).count()
        return series

    @property
    def get_some_series(self):
        return self.brand_series.filter(isDiscontinued=False)[:3]

    class Meta:
        verbose_name = _('Brand')
        verbose_name_plural = _('Brands')


class Series(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='brand_series')
    name = models.CharField(_('Series Name'), max_length=255)
    slug = models.SlugField()
    image = models.ImageField(upload_to=upload_series_image,
                              validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])])
    bodyStyle = models.ForeignKey(BodyStyle, on_delete=models.SET_NULL, verbose_name=_('Body Style'), null=True,
                                  blank=True)
    isDiscontinued = models.BooleanField(_('Discontinued Series'), default=False)

    def __str__(self):
        return self.name

    def get_models_count(self):
        return self.series_models.all().count()

    def get_first_year(self):
        model = self.series_models.order_by('startYear')[0]
        oldest_year = model.startYear
        return oldest_year

    def get_last_year(self):
        model = self.series_models.order_by('-endYear')[0]
        newest_year = model.endYear
        return newest_year

    @property
    def get_all_models(self):
        return self.series_models.all()

    class Meta:
        verbose_name = _('Series')
        verbose_name_plural = _('Series')


# MODEL (GENERATIONS) OPTIONS
def year_choices():
    return [(r, r) for r in range(1900, datetime.date.today().year + 1)]


def current_year():
    return datetime.date.today().year


class Model(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='brand_models')
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='series_models')
    name = models.CharField(_('Model Name'), max_length=255)
    slug = models.SlugField()
    image = models.ImageField(upload_to=upload_model_image)
    startYear = models.IntegerField(_('Start Year'), choices=year_choices())
    endYear = models.IntegerField(_('End Year'), choices=year_choices(), default=current_year())
    fuelType = models.ManyToManyField(FuelTypes, verbose_name='Fuel', blank=True)
    segment = models.ForeignKey(Segment, on_delete=models.SET_NULL, verbose_name=_('Segment'), null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return '{} {} - {}'.format(self.name, self.startYear, self.endYear)

    @property
    def get_all_cars(self):
        return self.m_cars.all()

    @property
    def get_all_model_images(self):
        return self.images.all()

    class Meta:
        verbose_name = _('Model')
        verbose_name_plural = _('Models')


class ModelImages(models.Model):
    model = models.ForeignKey(Model, on_delete=models.CASCADE, related_name='images', verbose_name=_('Model Name'))
    alt_text = models.CharField(_('Alt Text'), max_length=255)
    image = models.ImageField()

    def __str__(self):
        return self.alt_text

    class Meta:
        verbose_name = _('Model Image')
        verbose_name_plural = _('Model Images')


# CAR
class CarSpecificationType(models.Model):
    name = models.CharField(_('Type Name'), max_length=255, unique=True)
    is_active = models.BooleanField(_('Active'), default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Car Specification Type")
        verbose_name_plural = _("Car Specification Types")


class CarSpecification(models.Model):
    cs_type = models.ForeignKey(
        CarSpecificationType,
        on_delete=models.RESTRICT,
        verbose_name=_('Car Specification Type')
    )
    name = models.CharField(_("Car Specification"), max_length=255, help_text=_("Required"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Car Specification")
        verbose_name_plural = _("Car Specifications")


class Car(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='b_cars', verbose_name=_('Brand'))
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='s_cars', verbose_name=_('Series'))
    model = models.ForeignKey(Model, on_delete=models.CASCADE, related_name='m_cars', verbose_name=_('Model'))
    name = models.CharField(_('Car Name'), max_length=255)
    slug = models.SlugField()
    fuelType = models.ForeignKey(FuelTypes, on_delete=models.SET_NULL, verbose_name=_('Fuel'), null=True)
    engine = models.CharField(_('Engine'), max_length=255, help_text='example: 320d 6MT')
    enginePower = models.IntegerField(_('Power'), help_text='HP value')

    def __str__(self):
        name = '{} {} ({} HP)'.format(
            self.model, self.engine, self.enginePower)
        return name

    @property
    def engine_name(self):
        name = f'{self.engine} ({self.enginePower} HP)'
        return name

    @property
    def get_all_specifications(self):
        return self.specifications.all()

    class Meta:
        verbose_name = _('Car')
        verbose_name_plural = _('Cars')


class CarSpecificationValue(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="specifications")
    specification = models.ForeignKey(CarSpecification, on_delete=models.RESTRICT, verbose_name=_('Specification'))
    value = models.CharField(_("Value"), max_length=255)

    def __str__(self):
        return f'{self.specification} - {self.value}'

    class Meta:
        verbose_name = _("Car Specification Value")
        verbose_name_plural = _("3 - Car Specification Values")
