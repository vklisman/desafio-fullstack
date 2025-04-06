from celery import shared_task
import statistics
from ..models import Processamento

@shared_task
def processar_numeros(task_id):
    obj = Processamento.objects.get(id=task_id)
    nums = [obj.num1, obj.num2, obj.num3]
    obj.media = sum(nums) / 3
    obj.mediana = statistics.median(nums)
    obj.status = 'Concluído'
    obj.save()