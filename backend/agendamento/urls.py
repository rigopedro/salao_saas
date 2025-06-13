from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServicoViewSet, ProfissionalViewSet, AgendamentoViewSet

router = DefaultRouter()
router.register(r'servicos', ServicoViewSet, basename='servico')
router.register(r'profissionais', ProfissionalViewSet, basename='profissional')
router.register(r'agendamentos', AgendamentoViewSet, basename='agendamento')

urlpatterns = [
    path('', include(router.urls)),
]
