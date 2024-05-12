import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { PopupState } from '../../shared/types/PopupState';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((err) => {
      if (err.error === 'Invalid username or password') {
        messageService.add({
          severity: PopupState.ERROR,
          summary: 'Error',
          detail: err.error,
        });
      } else {
        messageService.add({
          severity: PopupState.ERROR,
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
      return throwError(err);
    })
  );
};
