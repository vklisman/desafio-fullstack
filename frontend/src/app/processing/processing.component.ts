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

  constructor(private http: HttpClient) { }

  enviarNumeros() {
    this.http.post<any>('http://localhost:8000/api/processar/', {
      num1: this.num1,
      num2: this.num2,
      num3: this.num3
    }).subscribe(res => {
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
        this.http.get<any>(`http://localhost:8000/api/status/${id}/`).subscribe(r => {
          if (r.status === 'Concluído') {
            clearInterval(interval);
            item.status = 'Concluído';
            item.media = r.media;
            item.mediana = r.mediana;
          }
        });
      }, 2000);
    });
  }
}
