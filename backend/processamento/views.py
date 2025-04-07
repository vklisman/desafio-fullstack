from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Processamento
from .serializers import ProcessamentoSerializer
from .worker.tasks import processar_numeros

# View para processar números enviados pelo frontend.
@api_view(['POST'])
def processar(request):
    try:
        # Validação para garantir que os valores são numéricos
        num1 = float(request.data.get('num1'))
        num2 = float(request.data.get('num2'))
        num3 = float(request.data.get('num3'))
    except (ValueError, TypeError):
        return Response(
            {'error': 'Todos os valores devem ser números válidos.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Criação do objeto e envio para processamento
    obj = Processamento.objects.create(num1=num1, num2=num2, num3=num3)
    processar_numeros.delay(obj.id)
    return Response({'id': obj.id, 'status': 'Processando'})

# Valida os dados, cria um objeto no banco e dispara uma tarefa assíncrona no Celery.
@api_view(['GET'])
def status(request, id):
    try:
        obj = Processamento.objects.get(id=id)
        serializer = ProcessamentoSerializer(obj)
        return Response(serializer.data)
    except Processamento.DoesNotExist:
        return Response({'error': 'Processamento não encontrado'}, status=404)