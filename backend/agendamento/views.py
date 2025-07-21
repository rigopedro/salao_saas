from rest_framework import viewsets
from .models import Servico, Profissional, Agendamento
from .serializers import ServicoSerializer, ProfissionalSerializer, AgendamentoSerializer, AgendamentoCreateSerializer, UserCreateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import time, timedelta, date
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

class ServicoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

class ProfissionalViewSet(viewsets.ModelViewSet):
    queryset = Profissional.objects.all()
    serializer_class = ProfissionalSerializer

    @action(detail=True, methods=['get'])
    def disponibilidade(self, request, pk=None):
        profissional = self.get_object()
        data_str = request.query_params.get('data')
        servico_id = request.query_params.get('servico_id')

        if not data_str or not servico_id:
            return Response({"detail": "Os parâmetros 'data' e 'servico_id' são obrigatórios."}, status=400)

        try:
            data = timezone.datetime.strptime(data_str, '%Y-%m-%d').date()
            servico = Servico.objects.get(id=servico_id)
            duracao_servico = timedelta(minutes=servico.duracao_minutos)
        except (ValueError, Servico.DoesNotExist):
            return Response({"detail": "Formato de data inválido ou serviço não encontrado."}, status=400)

        horario_inicio_trabalho = time(9, 0)
        horario_fim_trabalho = time(18, 0)
        horario_inicio_almoco = time(12, 0)
        horario_fim_almoco = time(13, 0)

        agendamentos_do_dia = Agendamento.objects.filter(
            profissional=profissional,
            data_hora__date=data
        )

        horarios_ocupados = []
        for agendamento in agendamentos_do_dia:
            inicio = agendamento.data_hora
            duracao_total_minutos = sum(s.duracao_minutos for s in agendamento.servicos.all())
            duracao_agendamento = timedelta(minutes=duracao_total_minutos)
            fim = inicio + duracao_agendamento
            horarios_ocupados.append((inicio.time(), fim.time()))

        horarios_disponiveis = []
        slot_atual = timezone.make_aware(timezone.datetime.combine(data, horario_inicio_trabalho))
        fim_do_dia = timezone.make_aware(timezone.datetime.combine(data, horario_fim_trabalho))

        while slot_atual < fim_do_dia:
            slot_fim = slot_atual + duracao_servico
            
            if slot_fim.time() > horario_fim_trabalho or \
               (slot_atual.time() >= horario_inicio_almoco and slot_atual.time() < horario_fim_almoco) or \
               (slot_fim.time() > horario_inicio_almoco and slot_fim.time() <= horario_fim_almoco):
                slot_atual += timedelta(minutes=30)
                continue

            conflito = False
            for inicio_ocupado, fim_ocupado in horarios_ocupados:
                if max(slot_atual.time(), inicio_ocupado) < min(slot_fim.time(), fim_ocupado):
                    conflito = True
                    break
            
            if not conflito:
                horarios_disponiveis.append(slot_atual.strftime('%H:%M'))

            slot_atual += timedelta(minutes=30)

        return Response(horarios_disponiveis)

class AgendamentoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Agendamento.objects.filter(cliente=user, data_hora__gte=timezone.now()).order_by('data_hora')

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'partial_update' or self.action == 'update':
            return AgendamentoCreateSerializer
        return AgendamentoSerializer

    def perform_create(self, serializer):
        servicos = serializer.validated_data.pop('servicos')
        agendamento = serializer.save(cliente=self.request.user)
        agendamento.servicos.set(servicos)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer