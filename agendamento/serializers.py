from rest_framework import serializers
from .models import Servico, Profissional, Agendamento
from django.contrib.auth.models import User


class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfissionalSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()

    class Meta:
        model = Profissional
        fields = ['id', 'usuario', 'especialidade']

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = ['id', 'profissional', 'servico', 'data_hora', 'cliente']
        read_only_fields = ['cliente']