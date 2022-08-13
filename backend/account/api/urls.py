from django.urls import path
from account.api.views import (
    CustomerRegisterView,
    # ADDRESS
    AddressCreateAPIView,
    AddressUpdateDeleteAPIView,
    AddressListAPIView,
    # CUSTOMER PROFILE
    CustomerUserDetailAPIView,
    DefaultAddressUpdateAPIView,
    EmailUpdateAPIView,
    PasswordUpdateAPIView,
    CustomerPhoneNumberUpdateAPIView,
    IdentityInformationUpdateAPIView
)

app_name = 'account'

urlpatterns = [
    path('register/customer/', CustomerRegisterView.as_view(), name='register_customer'),

    # CUSTOMER
    path('customer/create/address/', AddressCreateAPIView.as_view(), name='customer_create_address'),
    path('customer/update/address/', AddressUpdateDeleteAPIView.as_view(), name='customer_update_address'),

    # ADDRESS LIST
    path('my/address_list/', AddressListAPIView.as_view(), name='address_list'),

    # CUSTOMER
    path('profile/<user__username>', CustomerUserDetailAPIView.as_view(), name='customer_detail'),
    path('profile/update/identity/', IdentityInformationUpdateAPIView.as_view(), name='customer_update_identity'),
    path('profile/update/phone/', CustomerPhoneNumberUpdateAPIView.as_view(), name='customer_update_phone'),
    path('profile/update/address/', DefaultAddressUpdateAPIView.as_view(), name='customer_update_address'),
    # CUSTOMER & SUPPLIER
    path('profile/update/email/', EmailUpdateAPIView.as_view(), name='update_email'),
    path('profile/update/password/', PasswordUpdateAPIView.as_view(), name='update_password'),

]
