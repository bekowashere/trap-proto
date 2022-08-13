# REST FRAMEWORK
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FileUploadParser

# REST FRAMEWORK VIEWS
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView

# REST FRAMEWORK - JWT
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# FILTER

# PERMISSIONS
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

# OUR PERMISSIONS
from account.api.permissions import IsSuperUser, IsSupplier, IsOwner

# HELPERS
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.utils.text import slugify

# OWN HELPERS
from account.validators import validate_phone_number

# TOKEN GENERATOR
from django.contrib.auth.tokens import default_token_generator, PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

# EMAIL
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

# MODELS
from account.models import User, CustomerUser, SupplierUser, Address
from world.models import Country

# SERIALIZERS
from account.api.serializers import (
    UserSerializerWithToken,
    AddressSerializer,
    CustomerUserDetailSerializer,
    ShippingAddressSerializer,
)


class MyTokenObtainPairSerializer(TokenObtainSerializer):
    def validate(self, attrs):
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# CUSTOMER DETAIL
class CustomerUserDetailAPIView(RetrieveAPIView):
    queryset = CustomerUser.objects.all()
    serializer_class = CustomerUserDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user__username'


# REGISTER PART
# CUSTOMER REGISTER
class CustomerRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')
        password2 = data.get('password2')

        # username
        _first_name = first_name.replace("ı", "i")
        _last_name = last_name.replace("ı", "i")

        ex = False
        new_username = slugify(f'c-{_first_name}{_last_name}')
        ex = User.objects.filter(username=new_username).exists()
        while ex:
            new_username = slugify(new_username + " " + get_random_string(9, "0123456789"))
            ex = User.objects.filter(username=new_username).exists()

        username = new_username

        # CONTROL FIELDS
        messages = {'errors': []}

        if email == None:
            messages['errors'].append('Email can not be empty')
        if password == None:
            messages['errors'].append('Password can not be empty')
        if password and password2 and password != password2:
            messages['errors'].append('Passwords do not be match')
        if User.objects.filter(email=email).exists():
            messages['errors'].append('Account already exists with this email')
        if User.objects.filter(username=username).exists():
            messages['errors'].append('Account already exists with this username')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # create user
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                first_name=first_name,
                last_name=last_name,
                is_customer=True
            )
            serializer = UserSerializerWithToken(user, many=False)

            # create customer
            customer = CustomerUser.objects.create(user=user)

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ADDRESS CREATE - UPDATE - DELETE
class AddressCreateAPIView(APIView):
    permission_classes = [IsOwner]

    def post(self, request):
        data = request.data
        user = request.user

        address_name = data.get('address_name')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        company_name = data.get('company_name')
        phone_number = data.get('phone_number')
        street_address_1 = data.get('street_address_1')
        street_address_2 = data.get('street_address_2')
        postal_code = data.get('postal_code')
        city = data.get('city')
        city_area = data.get('city_area')
        country = data.get('country')

        # frontend'den country değerini id olarak çektiğimizi varsayarsak
        _country = Country.objects.get(id=country)

        try:
            customer_user = CustomerUser.objects.get(user=user)

            address = Address.objects.create(
                user=customer_user,
                address_name=address_name,
                first_name=first_name,
                last_name=last_name,
                company_name=company_name,
                phone_number=phone_number,
                street_address_1=street_address_1,
                street_address_2=street_address_2,
                postal_code=postal_code,
                city=city,
                city_area=city_area,
                country=_country
            )

            
            if customer_user.default_shipping_address is None:
                customer_user.default_shipping_address = address

                
            serializer = ShippingAddressSerializer(address)
            customer_user.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddressUpdateDeleteAPIView(APIView):
    permission_classes = [IsOwner]

    def put(self, request):
        data = request.data
        user = request.user
        address_id = data.get('address_id')

        address_name = data.get('address_name')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        company_name = data.get('company_name')
        phone_number = data.get('phone_number')
        street_address_1 = data.get('street_address_1')
        street_address_2 = data.get('street_address_2')
        postal_code = data.get('postal_code')
        city = data.get('city')
        city_area = data.get('city_area')
        country = data.get('country')

        _country = Country.objects.get(id=country)

        try:
            address = Address.objects.get(id=address_id)
            address.address_name = address_name
            address.first_name = first_name
            address.last_name = last_name
            address.company_name = company_name
            address.phone_number = phone_number
            address.street_address_1 = street_address_1
            address.street_address_2 = street_address_2
            address.postal_code = postal_code
            address.city = city
            address.city_area = city_area
            address.country = _country

            address.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Address changed successfully'}, status=status.HTTP_200_OK)

    def delete(self, request):
        data = request.data
        address_id = data.get('address_id')

        try:
            address = Address.objects.get(id=address_id)
            address.delete()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Address deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class AddressListAPIView(ListAPIView):
    # queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)


class DefaultAddressUpdateAPIView(APIView):
    permission_classes = [IsOwner]

    def put(self, request):
        data = request.data
        user = request.user

        default_shipping_address_id = data.get('default_shipping_id')
        default_billing_address_id = data.get('default_billing_id')

        try:
            default_shipping_address = Address.objects.get(id=default_shipping_address_id)
            default_billing_address = Address.objects.get(id=default_billing_address_id)

            customer = CustomerUser.objects.get(user=user)
            customer.default_shipping_address = default_shipping_address
            customer.default_billing_address = default_billing_address
            customer.save()

        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Default addresses changed successfully'}, status=status.HTTP_200_OK)


class EmailUpdateAPIView(APIView):
    # or IsOwner
    permission_classes = [IsAuthenticated]

    def put(self, request):
        data = request.data
        user = request.user

        new_email = data.get('new_email')

        messages = {'errors': []}

        if new_email == None:
            messages['errors'].append('Email can not be empty')
        if User.objects.filter(email=new_email).exclude(email=user.email).exists():
            messages['errors'].append('Account already exists with this email')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user.email = new_email
            user.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Email changed successfully'}, status=status.HTTP_200_OK)


# from django.contrib.auth.password_validation import validate_password

class PasswordUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        data = request.data
        user = request.user

        old_password = data.get('old_password')
        new_password = data.get('new_password')
        new_password_confirm = data.get('new_password_confirm')
        if not user.check_password(old_password):
            return Response({'detail': 'Wrong Password'}, status=status.HTTP_400_BAD_REQUEST)
        if new_password and new_password_confirm:
            if new_password == new_password_confirm:
                if len(new_password) >= 8:
                    user.set_password(new_password)
                    user.save()
                    return Response({'detail': 'Password changed successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": 'This password is too short. It must contain at least 8 characters.'},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"detail": 'Password does not match'}, status=status.HTTP_400_BAD_REQUEST)
        elif new_password is None:
            return Response({'detail': 'New password field required'}, status=status.HTTP_400_BAD_REQUEST)
        elif new_password_confirm is None:
            return Response({'detail': 'New password confirm field required'}, status=status.HTTP_400_BAD_REQUEST)


# validate_phone_number
class CustomerPhoneNumberUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        data = request.data
        user = request.user

        phone_number = data.get('phone_number')

        messages = {'errors': []}

        if phone_number == None:
            messages['errors'].append('Phone number can not be empty')
        if not validate_phone_number(phone_number):
            messages['errors'].append('Wrong format')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            customer = CustomerUser.objects.get(user=user)
            customer.phone_number = phone_number
            customer.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Phone number changed successfully'}, status=status.HTTP_200_OK)


class IdentityInformationUpdateAPIView(APIView):
    permission_classes = [AllowAny]

    def put(self, request):
        data = request.data
        user = request.user

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')

        messages = {'errors': []}

        if first_name == None:
            messages['errors'].append('First name can not be empty')
        if last_name == None:
            messages['errors'].append('Last name can not be empty')
        if email == None:
            messages['errors'].append('Email can not be empty')
        if User.objects.filter(email=email).exclude(email=user.email).exists():
            messages['errors'].append('Account already exists with this email')
        if len(messages['errors']) > 0:
            return Response({'detail': messages['errors']}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.save()
        except Exception as e:
            print(e)
            return Response({'detail': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Identity information changed successfully'}, status=status.HTTP_200_OK)
