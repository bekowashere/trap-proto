from rest_framework import serializers
from auto.models import (
    Brand,
    Series,
    Model,
    ModelImages,
    Car,
    CarSpecificationValue,
    CarSpecificationType,
    FuelTypes,
    Segment
)

class SomeSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ('id','name', 'slug')


class BrandListSerializer(serializers.ModelSerializer):
    """
    name
    slug
    image
    description
    """
    in_production_count = serializers.SerializerMethodField()
    discontinued_count = serializers.SerializerMethodField()
    some_series = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name='auto:brand_detail',
        lookup_field='slug'
    )

    def get_in_production_count(self, obj):
        return obj.get_continued_count()

    def get_discontinued_count(self, obj):
        return obj.get_discontinued_count()

    def get_some_series(self, obj):
        return SomeSeriesSerializer(obj.get_some_series, many=True).data

    class Meta:
        model = Brand
        fields = ('id','name', 'slug', 'url', 'image', 'description', 'in_production_count', 'discontinued_count','some_series')


class SeriesListSerializer(serializers.ModelSerializer):
    """
    brand (FK)
    name
    slug
    image
    bodyStyle (FK)
    isDiscontinued
    """
    brand_name = serializers.SerializerMethodField()
    bodyStyle = serializers.SerializerMethodField()

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_bodyStyle(self, obj):
        return obj.bodyStyle.style

    class Meta:
        model = Series
        fields = ('brand', 'brand_name', 'name', 'slug', 'image', 'bodyStyle', 'isDiscontinued')


class FuelTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelTypes
        fields = ('id','type',)


class ModelListSerializer(serializers.ModelSerializer):
    """
    brand
    series
    name
    slug
    image
    startYear
    endYear
    fuelType
    segment
    description
    """
    brand_name = serializers.SerializerMethodField()
    series_name = serializers.SerializerMethodField()
    fuelType = FuelTypesSerializer(many=True)
    segment = serializers.SerializerMethodField()

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_series_name(self, obj):
        return obj.series.name

    def get_segment(self, obj):
        return obj.segment.name

    class Meta:
        model = Model
        fields = ('brand', 'brand_name', 'series', 'series_name', 'id', 'name', 'slug', 'image', 'startYear', 'endYear',
                  'fuelType', 'segment', 'description')


class SeriesSerializer(serializers.ModelSerializer):
    bodyStyle = serializers.SerializerMethodField()
    generation_count = serializers.SerializerMethodField()
    generation_oldest_year = serializers.SerializerMethodField()
    generation_newest_year = serializers.SerializerMethodField()

    def get_bodyStyle(self, obj):
        return obj.bodyStyle.style

    def get_generation_count(self, obj):
        return obj.get_models_count()

    def get_generation_oldest_year(self, obj):
        return obj.get_first_year()

    def get_generation_newest_year(self, obj):
        return obj.get_last_year()

    class Meta:
        model = Series
        fields = ('id','name', 'slug', 'image', 'bodyStyle', 'isDiscontinued', 'generation_count', 'generation_oldest_year',
                  'generation_newest_year')


class BrandDetailSerializer(serializers.ModelSerializer):
    total_series_count = serializers.SerializerMethodField()
    in_production_count = serializers.SerializerMethodField()
    discontinued_count = serializers.SerializerMethodField()
    continued_series = serializers.SerializerMethodField()
    discontinued_series = serializers.SerializerMethodField()

    def get_total_series_count(self, obj):
        return obj.get_total_series_count()

    def get_in_production_count(self, obj):
        return obj.get_continued_count()

    def get_discontinued_count(self, obj):
        return obj.get_discontinued_count()

    def get_continued_series(self, obj):
        return SeriesSerializer(obj.get_continued_series, many=True).data

    def get_discontinued_series(self, obj):
        return SeriesSerializer(obj.get_discontinued_series, many=True).data

    class Meta:
        model = Brand
        fields = (
            'id','name', 'slug', 'image', 'description', 'total_series_count', 'in_production_count', 'discontinued_count',
            'continued_series',
            'discontinued_series'
        )


class CarSerializer(serializers.ModelSerializer):
    fuelType = serializers.SerializerMethodField()
    engineName = serializers.SerializerMethodField()

    def get_fuelType(self, obj):
        return obj.fuelType.type

    def get_engineName(self, obj):
        return obj.engine_name

    class Meta:
        model = Car
        fields = ('id', 'name', 'slug', 'fuelType', 'engine', 'enginePower', 'engineName')


class ModelImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelImages
        fields = ('alt_text', 'image')


class ModelSerializer(serializers.ModelSerializer):
    fuelType = FuelTypesSerializer(many=True)
    cars = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    def get_cars(self, obj):
        return CarSerializer(obj.get_all_cars, many=True).data

    def get_description(self, obj):
        return obj.description[:235]

    class Meta:
        model = Model
        fields = ('id','name', 'slug', 'image', 'startYear', 'endYear', 'description', 'fuelType', 'cars')


class SeriesDetailSerializer(serializers.ModelSerializer):
    generation_count = serializers.SerializerMethodField()
    first_production_year = serializers.SerializerMethodField()
    brand_logo = serializers.SerializerMethodField()
    models = serializers.SerializerMethodField()
    bodyStyle = serializers.SerializerMethodField()
    brand_name = serializers.SerializerMethodField()
    brand_slug = serializers.SerializerMethodField()

    def get_generation_count(self, obj):
        return obj.get_models_count()

    def get_first_production_year(self, obj):
        return obj.get_first_year()

    def get_brand_logo(self, obj):
        return obj.brand.image_url

    def get_models(self, obj):
        return ModelSerializer(obj.get_all_models, many=True).data

    def get_bodyStyle(self, obj):
        return obj.bodyStyle.style

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_brand_slug(self, obj):
        return obj.brand.slug

    class Meta:
        model = Series
        fields = ('name', 'slug', 'generation_count', 'first_production_year','bodyStyle', 'brand_name','brand_slug','brand_logo', 'models')


# MODEL
class ModelBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('name', 'slug', 'image')




class ModelDetailSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()
    brand_slug = serializers.SerializerMethodField()
    series_name = serializers.SerializerMethodField()
    series_slug = serializers.SerializerMethodField()
    segment = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    cars = serializers.SerializerMethodField()
    bodyStyle = serializers.SerializerMethodField()
    fuelType = FuelTypesSerializer(read_only=True, many=True)

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_brand_slug(self, obj):
        return obj.brand.slug

    def get_series_name(self, obj):
        return obj.series.name

    def get_series_slug(self, obj):
        return obj.series.slug

    def get_segment(self, obj):
        return obj.segment.name

    def get_images(self, obj):
        return ModelImagesSerializer(obj.get_all_model_images, many=True).data

    def get_cars(self, obj):
        return CarSerializer(obj.get_all_cars, many=True).data

    def get_bodyStyle(self, obj):
        return obj.series.bodyStyle.style

    class Meta:
        model = Model
        fields = (
            'brand_name', 'brand_slug', 'series_name', 'series_slug', 'name', 'slug', 'image', 'startYear', 'endYear', 'segment','fuelType', 'bodyStyle', 'description',
            'images', 'cars')


class CarSpecificationValueSerializer(serializers.ModelSerializer):
    specification_type = serializers.SerializerMethodField()
    specification = serializers.SerializerMethodField()

    def get_specification_type(self, obj):
        return obj.specification.cs_type.name

    def get_specification(self, obj):
        return obj.specification.name

    class Meta:
        model = CarSpecificationValue
        fields = ('specification_type', 'specification', 'value')


class CarDetailSerializer(serializers.ModelSerializer):
    brand = serializers.SerializerMethodField()
    series = serializers.SerializerMethodField()
    model = serializers.SerializerMethodField()
    model_slug = serializers.SerializerMethodField()
    fuelType = serializers.SerializerMethodField()
    specifications = serializers.SerializerMethodField()
    engineName = serializers.SerializerMethodField()

    def get_brand(self, obj):
        return obj.brand.name

    def get_series(self, obj):
        return obj.series.name

    def get_model(self, obj):
        return obj.model.name

    def get_model_slug(self, obj):
        return obj.model.slug

    def get_fuelType(self, obj):
        return obj.fuelType.type

    def get_specifications(self, obj):
        return CarSpecificationValueSerializer(obj.get_all_specifications, many=True).data

    def get_engineName(self, obj):
        return obj.engine_name

    class Meta:
        model = Car
        fields = (
            'brand', 'series', 'model','model_slug', 'name', 'slug', 'engine', 'enginePower', 'engineName', 'fuelType',
            'specifications')


# PART 2 - SEARCH BAR
class SearchBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name')


class SearchSeriesSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()

    def get_brand_name(self, obj):
        return obj.brand.name

    class Meta:
        model = Series
        fields = ('brand', 'brand_name', 'id', 'name')


class SearchModelSerializer(serializers.ModelSerializer):
    series_name = serializers.SerializerMethodField()

    def get_series_name(self, obj):
        return obj.series.name

    class Meta:
        model = Model
        fields = ('series', 'series_name', 'id', 'name', 'startYear', 'endYear', 'slug')


class SearchCarSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()
    series_name = serializers.SerializerMethodField()
    model_name = serializers.SerializerMethodField()

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_series_name(self, obj):
        return obj.series.name

    def get_model_name(self, obj):
        return obj.model.name

    class Meta:
        model = Car
        fields = (
            'brand', 'brand_name', 'series', 'series_name', 'model', 'model_name', 'id', 'name', 'slug', 'fuelType')
