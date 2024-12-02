import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface SharedState {
  counter: number;
  lastUpdated: Date;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private initialState: SharedState = {
    counter: 0,
    lastUpdated: new Date(),
    message: 'Inicial'
  };

  private state = new BehaviorSubject<SharedState>(this.initialState);

  // Observables para componentes
  counter$ = this.state.asObservable().pipe(map(state => state.counter));
  lastUpdated$ = this.state.asObservable().pipe(map(state => state.lastUpdated));
  message$ = this.state.asObservable().pipe(map(state => state.message));

  constructor() {}

  // Métodos para actualizar el estado
  incrementCounter() {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      counter: currentState.counter + 1,
      lastUpdated: new Date()
    });
  }

  setMessage(message: string) {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      message,
      lastUpdated: new Date()
    });
  }

  // Obtener el estado actual
  getCurrentState(): SharedState {
    return this.state.getValue();
  }

  // Reset al estado inicial
  reset() {
    this.state.next(this.initialState);
  }
}
