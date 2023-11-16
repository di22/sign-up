import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(new HttpResponse({
          body: error.error
        }));
      })
    );
  }
}
