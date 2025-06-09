from django.contrib import admin
from .models import Servico, Profissional, Agendamento

admin.site.register(Servico)
admin.site.register(Profissional)
admin.site.register(Agendamento)
