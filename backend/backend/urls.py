from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenRefreshView
from account.api.views import MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api-auth/', include('rest_framework.urls'))
    path('api/account/', include('account.api.urls')),
    path('api/auto/', include('auto.api.urls')),
    path('api/autopart/', include('autopart.api.urls')),
    path('api/order/', include('order.api.urls')),
    path('api/world/', include('world.api.urls')),

    # TOKEN - LOGIN
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
