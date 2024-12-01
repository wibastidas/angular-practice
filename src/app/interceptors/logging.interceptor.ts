import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoggerService } from '../services/logger.service';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);
  const startTime = Date.now();

  logger.logRequest(req.method, req.url, req.body);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          logger.logResponse(
            req.method,
            req.url,
            event.status,
            duration,
            event.body
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        const duration = Date.now() - startTime;
        logger.logError(
          req.method,
          req.url,
          error.status,
          duration,
          error
        );
      }
    })
  );
};
