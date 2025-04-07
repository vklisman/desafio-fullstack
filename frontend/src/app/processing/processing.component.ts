import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import necessário para *ngIf e *ngFor
import { FormsModule } from '@angular/forms';    // Import necessário para [(ngModel)]

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent {
  num1: number = 0;
  num2: number = 0;
  num3: number = 0;
  processamentos: any[] = [];
  errorMessage: string = ''; // Variável para armazenar a mensagem de erro
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  // Envia os números para o backend e inicia o polling para verificar o status do processamento.
  enviarNumeros() {
    if (isNaN(this.num1) || isNaN(this.num2) || isNaN(this.num3)) {
      this.errorMessage = 'Todos os valores devem ser números válidos.';
      return;
    }

    this.errorMessage = ''; // Limpa a mensagem de erro se os valores forem válidos

    this.http.post<any>('http://localhost:8000/api/processar/', {
      num1: this.num1,
      num2: this.num2,
      num3: this.num3
    }).subscribe(
      res => {
        this.successMessage = 'Números enviados com sucesso!';
        setTimeout(() => this.successMessage = '', 3000);
        const id = res.id;
        const item: any = {
          id: id,
          num1: this.num1,
          num2: this.num2,
          num3: this.num3,
          status: 'Processando...'
        };
        this.processamentos.push(item);

        const interval = setInterval(() => {
          this.errorMessage = 'Erro ao processar os números.';
          this.http.get<any>(`http://localhost:8000/api/status/${id}/`).subscribe(r => {
            if (r.status === 'Concluído') {
              clearInterval(interval);
              item.status = 'Concluído';
              item.media = r.media;
              item.mediana = r.mediana;
            }
          });
        }, 2000);
      },
      err => {
        this.errorMessage = 'Erro ao processar os números.';
      }
    );
  }
}