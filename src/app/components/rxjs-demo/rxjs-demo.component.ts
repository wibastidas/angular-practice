import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, interval, Observable, of, throwError } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  catchError,
  takeUntil,
  switchMap,
  delay
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rxjs-demo">
      <h2>RxJS Operators Demo</h2>

      <div class="demo-section">
        <h3>Mapped Values:</h3>
        <p>{{ mappedValues }}</p>
      </div>

      <div class="demo-section">
        <h3>Filtered Values:</h3>
        <p>{{ filteredValues }}</p>
      </div>

      <div class="demo-section">
        <h3>Debounced Value:</h3>
        <p>{{ debouncedValue }}</p>
      </div>

      <div class="demo-section">
        <h3>Switched Value:</h3>
        <p>{{ switchedValue }}</p>
      </div>

      <div class="demo-section">
        <h3>Error Handling:</h3>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .rxjs-demo {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .demo-section {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class RxjsDemoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  mappedValues: string = '';
  filteredValues: string = '';
  debouncedValue: string = '';
  switchedValue: string = '';
  errorMessage: string = '';

  constructor() {}

  ngOnInit() {
    // 1. map: Transforma datos
    of(1, 2, 3, 4, 5).pipe(
      map(num => num * 2),
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.mappedValues += `${value} `
    );

    // 2. filter: Filtra valores basado en una condición
    of(1, 2, 3, 4, 5).pipe(
      filter(num => num % 2 === 0),
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.filteredValues += `${value} `
    );

    // 3. debounceTime: Espera un tiempo antes de emitir
    const input$ = new Subject<string>();
    input$.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.debouncedValue = value
    );

    // Simulamos entrada de usuario
    setTimeout(() => input$.next('a'), 100);
    setTimeout(() => input$.next('ab'), 200);
    setTimeout(() => input$.next('abc'), 300);

    // 4. switchMap: Cancela la suscripción anterior y cambia a un nuevo observable
    const trigger$ = new Subject<number>();
    trigger$.pipe(
      switchMap(id => this.getDataById(id)),
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.switchedValue = value
    );

    // Simulamos múltiples solicitudes
    setTimeout(() => trigger$.next(1), 100);
    setTimeout(() => trigger$.next(2), 200);

    // 5. catchError: Manejo de errores
    this.simulateError().pipe(
      catchError(error => {
        this.errorMessage = `Error capturado: ${error.message}`;
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    // 6. takeUntil: Ya implementado en todos los ejemplos anteriores
    // para manejar la limpieza de suscripciones
  }

  // Simula una llamada HTTP
  private getDataById(id: number): Observable<string> {
    return of(`Data for ID: ${id}`).pipe(
      delay(1000)
    );
  }

  // Simula un error
  private simulateError(): Observable<never> {
    return throwError(() => new Error('Error simulado'));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
