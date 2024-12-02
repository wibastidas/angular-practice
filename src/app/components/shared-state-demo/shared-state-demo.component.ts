import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shared-state-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="state-demo">
      <h2>Demo de Estado Compartido</h2>

      <div class="state-section">
        <h3>Contador: {{ counter }}</h3>
        <button (click)="increment()">Incrementar</button>
      </div>

      <div class="state-section">
        <h3>Mensaje</h3>
        <input [(ngModel)]="newMessage" placeholder="Nuevo mensaje">
        <button (click)="updateMessage()">Actualizar Mensaje</button>
        <p>Mensaje actual: {{ message }}</p>
      </div>

      <div class="state-section">
        <p>Última actualización: {{ lastUpdated | date:'medium' }}</p>
        <button (click)="resetState()">Reset Estado</button>
      </div>
    </div>
  `,
  styles: [`
    .state-demo {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .state-section {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      margin: 5px;
      padding: 8px 16px;
    }
    input {
      margin: 5px;
      padding: 8px;
      width: 200px;
    }
  `]
})
export class SharedStateDemoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  counter: number = 0;
  message: string = '';
  lastUpdated: Date = new Date();
  newMessage: string = '';

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    // Suscribirse a los cambios de estado
    this.sharedDataService.counter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => this.counter = count);

    this.sharedDataService.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe(msg => this.message = msg);

    this.sharedDataService.lastUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(date => this.lastUpdated = date);
  }

  increment() {
    this.sharedDataService.incrementCounter();
  }

  updateMessage() {
    if (this.newMessage.trim()) {
      this.sharedDataService.setMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  resetState() {
    this.sharedDataService.reset();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
