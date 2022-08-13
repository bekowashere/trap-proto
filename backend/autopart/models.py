from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from account.models import SupplierUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator
from auto.models import Car
from django_measurement.models import MeasurementField
from measurement.measures import Weight
from autopart.units import WeightUnits


class Category(MPTTModel):
    name = models.CharField(_('Category Name'), max_length=128)
    slug = models.SlugField(unique=True)
    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='children',
        verbose_name=_('Parent Category')
    )
    description = models.TextField(_('Description'), blank=True, null=True)
    image = models.ImageField(
        _('Category Image'),
        upload_to='autopart/category/',
        null=True,
        blank=True,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])]
    )

    def __str__(self):
        return self.name

    def get_all_children(self):
        return Category.objects.filter(parent=self)

    @property
    def any_children(self):
        return Category.objects.filter(parent=self).exists()

    class MPTTMeta:
        level_attr = 'mptt_level'
        order_insertion_by = ['name']

    class Meta:
        unique_together = ('slug', 'parent')
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')


def upload_productbrand_image(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return f'autopart-brands/{instance.name}.{extension}'


class ProductBrand(models.Model):
    name = models.CharField(_('Brand Name'), max_length=64)
    slug = models.SlugField()
    image = models.ImageField(
        _('Brand Image'),
        upload_to=upload_productbrand_image,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])]
    )
    description = models.TextField(_('Description'), blank=True, null=True)
    status = models.CharField(
        _('Status'),
        max_length=32,
        help_text="example: Original",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Product Brand')
        verbose_name_plural = _('Product Brands')


# PRODUCT
class ProductSpecification(models.Model):
    name = models.CharField(_('Product Specification'), max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Product Specification')
        verbose_name_plural = _('Product Specifications')


def upload_product_image(instance, filename):
    filebase, extension = filename.rsplit('.', 1)
    return f'autopart/{instance.category.parent}/{instance.category}/{instance.name}.{extension}'


class Product(models.Model):
    # product_type = models.IntegerField()  # ForeignKey ?
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='category_products',
        verbose_name=_("Category")
    )
    product_brand = models.ForeignKey(
        ProductBrand,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='pbrand_products',
        verbose_name=_("Product Brand"),
        help_text="example : Boscho"
    )
    # Supplier Information
    supplier = models.ForeignKey(
        SupplierUser,
        on_delete=models.CASCADE,
        related_name='supplier_products',
        verbose_name=_('Supplier')
    )
    # General Information
    name = models.CharField(_('Product Name'), max_length=255)
    # slug : name + sku (save method)
    slug = models.SlugField()
    description = models.TextField(_('Description'), null=True, blank=True)
    image = models.ImageField(
        _('Product Image'),
        upload_to=upload_product_image,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg'])]
    )

    # Product Information
    # stock keeping unit Example: BLU-TEE-MED-CF26
    sku = models.CharField(_('Stock Keeping Unit'), max_length=255, unique=True)
    stock = models.IntegerField(_('Stock'), null=True, blank=True)
    # minimum order quantity
    moq = models.IntegerField(_('Minimum Order Quantity'), null=True, blank=True)
    weight = MeasurementField(
        measurement=Weight,
        unit_choices=WeightUnits.CHOICES,
        blank=True,
        null=True
    )

    # Price
    price_net = models.DecimalField(_('Price'), max_digits=9, decimal_places=2)
    price_discounted = models.DecimalField(_('Discounted Price'), max_digits=9, decimal_places=2, blank=True, null=True)

    # Features
    is_active = models.BooleanField(_('Active'), default=True)
    is_new = models.BooleanField(_('New'), default=False)

    # Metadata
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    # Compatible Cars - m2m
    compatible_cars = models.ManyToManyField(
        Car,
        related_name="products",
        verbose_name=_('Compatible Cars'),
        blank=True,
    )

    def __str__(self):
        return self.name

    @property
    def discount_percentage(self):
        if self.price_discounted:
            percentage = ((self.price_discounted - self.price_net) / self.price_net) * 100
            return abs(percentage)

    def get_all_specifications(self):
        return self.specifications.all()

    def get_all_codes(self):
        return self.oem_codes.all()

    class Meta:
        verbose_name = _('Product')
        verbose_name_plural = _('Products')


class ProductSpecificationValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="specifications")
    specification = models.ForeignKey(ProductSpecification, on_delete=models.RESTRICT, verbose_name=_('Specification'))
    value = models.CharField(_('Value'), max_length=255)


class OEMCode(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="oem_codes")
    brand_name = models.CharField(_('Brand Name'), max_length=64)
    code = models.CharField(_("OEM Code"), max_length=64)

    def __str__(self):
        return f'{self.brand_name} {self.code}'

    class Meta:
        verbose_name = _('OEM Code')
        verbose_name_plural = _('OEM Codes')
