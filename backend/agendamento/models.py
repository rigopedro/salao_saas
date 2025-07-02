from django.db import models
from django.contrib.auth.models import User

class Servico(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    duracao_minutos = models.PositiveIntegerField()
    preco = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.nome

class Profissional(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    especialidade = models.CharField(max_length=100)

    def __str__(self):
        return self.usuario.username

class Agendamento(models.Model):
    STATUS_CHOICES = [
        ('Confirmado', 'Confirmado'),
        ('Pendente', 'Pendente'),
        ('Cancelado', 'Cancelado'),
    ]

    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='agendamentos_como_cliente')
    profissional = models.ForeignKey(Profissional, on_delete=models.CASCADE)
    servicos = models.ManyToManyField(Servico)
    data_hora = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pendente')

    def __str__(self):
        # ex: corte com tal pessoa para tal.pessoa no dia 10/06/2025 14:00
        return f"{self.servico.nome} com {self.profissional.usuario.username} para {self.cliente.username} em {self.data_hora.strftime('%d/%m/%Y %H:%M')}"