from django.contrib import admin
from django.urls import path, include

from agendamento.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('agendamento.urls')),

    path('api/v1/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]