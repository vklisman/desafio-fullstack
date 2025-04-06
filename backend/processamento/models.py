from django.db import models

class Processamento(models.Model):
    num1 = models.FloatField()
    num2 = models.FloatField()
    num3 = models.FloatField()
    media = models.FloatField(null=True, blank=True)
    mediana = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=20, default="Processando")
