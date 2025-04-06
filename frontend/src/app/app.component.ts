import { Component } from '@angular/core';
import { ProcessingComponent } from './processing/processing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProcessingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}