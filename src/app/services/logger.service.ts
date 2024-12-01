import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logRequest(method: string, url: string, body?: any) {
    console.group(` HTTP ${method} Request`);
    console.log('URL:', url);
    if (body) console.log('Body:', body);
    console.groupEnd();
  }

  logResponse(method: string, url: string, status: number, duration: number, body?: any) {
    console.group(`✅ HTTP ${method} Response (${duration}ms)`);
    console.log('URL:', url);
    console.log('Status:', status);
    if (body) console.log('Body:', body);
    console.groupEnd();
  }

  logError(method: string, url: string, status: number, duration: number, error: any) {
    console.group(`❌ HTTP ${method} Error (${duration}ms)`);
    console.error('URL:', url);
    console.error('Status:', status);
    console.error('Error:', error);
    console.groupEnd();
  }
}
