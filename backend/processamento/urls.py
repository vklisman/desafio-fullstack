from django.urls import path
from processamento import views

urlpatterns = [
    path('processar/', views.processar, name='processar'),
    path('status/<int:id>/', views.status, name='status'),
]