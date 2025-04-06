from rest_framework import serializers
from .models import Processamento

class ProcessamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processamento
        fields = '__all__'
