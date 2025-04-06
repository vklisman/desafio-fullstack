from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Processamento
from .serializers import ProcessamentoSerializer
from .worker.tasks import processar_numeros

@api_view(['POST'])
def processar(request):
    obj = Processamento.objects.create(
        num1=float(request.data['num1']),  # Convertendo para float
        num2=float(request.data['num2']),
        num3=float(request.data['num3'])
    )
    processar_numeros.delay(obj.id)
    return Response({'id': obj.id, 'status': 'Processando'})

@api_view(['GET'])
def status(request, id):
    try:
        obj = Processamento.objects.get(id=id)
        serializer = ProcessamentoSerializer(obj)
        return Response(serializer.data)
    except Processamento.DoesNotExist:
        return Response({'error': 'Processamento não encontrado'}, status=404)