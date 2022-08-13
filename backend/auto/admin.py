from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from auto.models import (
    Brand,
    Series,
    Model,
    ModelImages,
    Car,
    CarSpecificationType,
    CarSpecification,
    CarSpecificationValue,
    FuelTypes,
    BodyStyle,
    Segment
)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Brand Information'), {'fields': ('name', 'slug', 'image')}),
        (_('Description'), {'fields': ('description',)}),
    )

    list_display = ('name', 'slug')
    search_fields = ('name', 'slug')
    ordering = ('name',)


@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Series Information'), {'fields': ('brand', 'name', 'slug', 'image')}),
        (_('Specifications'), {'fields': ('bodyStyle',)}),
        (_('Discontinued'), {'fields': ('isDiscontinued',)}),
    )
    list_display = ('name', 'brand', 'slug')
    search_fields = ('name', 'brand__name', 'slug')
    ordering = ('name',)


class ModelImagesInline(admin.TabularInline):
    model = ModelImages


@admin.register(Model)
class ModelAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Model Information'), {'fields': ('brand', 'series', 'name', 'slug', 'image')}),
        (_('Date Information'), {'fields': ('startYear', 'endYear')}),
        (_('Specifications'), {'fields': ('fuelType', 'segment')}),
        (_('Description'), {'fields': ('description',)}),
    )
    list_display = ('name', 'brand', 'series', 'slug')
    search_fields = ('name', 'brand__name', 'series__name', 'slug')
    ordering = ('name',)

    inlines = [
        ModelImagesInline
    ]


# CAR
class CarSpecificationInline(admin.TabularInline):
    model = CarSpecification


@admin.register(CarSpecificationType)
class CarSpecificationTypeAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Type Information'), {'fields': ('name', 'is_active')}),
    )
    list_filter = ('is_active',)
    search_fields = ('name',)
    ordering = ('name',)

    inlines = [
        CarSpecificationInline
    ]


@admin.register(CarSpecification)
class CarSpecificationAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Car Specification Information'), {'fields': ('cs_type', 'name')}),
    )
    list_display = ('name', 'cs_type')
    search_fields = ('name', 'cs_type__name')
    ordering = ('cs_type',)


class CarSpecificationValueInline(admin.TabularInline):
    model = CarSpecificationValue


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    fieldsets = (
        (_('Car Information'), {'fields': ('brand', 'series', 'model', 'name', 'slug')}),
        (_('Fuel Specifications'), {'fields': ('fuelType',)}),
        (_('Engine Specifications'), {'fields': ('engine', 'enginePower')}),
    )
    list_display = ('name', 'model', 'slug')
    search_fields = ('name', 'model__name', 'slug')
    ordering = ('name',)

    inlines = [
        CarSpecificationValueInline
    ]


# HELPERS
admin.site.register(FuelTypes)
admin.site.register(BodyStyle)
admin.site.register(Segment)
