import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

interface Headers {
  [key: string]: string;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const bearerToken = localStorage.getItem('BearerToken');
    const xsrfToken = localStorage.getItem('X-XSRF-TOKEN');

    let headers: Headers = {};

    // Se esiste un BearerToken e la richiesta non è di tipo GET, aggiungilo all'intestazione
    if (bearerToken) {
      headers['Authorization'] = `Bearer ${bearerToken}`;
    }

    // Se esiste un X-XSRF-TOKEN, aggiungilo all'intestazione
    if (xsrfToken) {
      headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    // Clona la richiesta con le nuove intestazioni
    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request).pipe(
      tap(event => {
        // Se l'evento è una risposta HTTP e contiene l'intestazione X-XSRF-TOKEN
        if (event instanceof HttpResponse) {


          // Aggiorna il token XSRF se presente
          if (event.headers.has('X-XSRF-TOKEN')) {
            const newXsrfToken = event.headers.get('X-XSRF-TOKEN');
            localStorage.setItem('X-XSRF-TOKEN', newXsrfToken!);
          }
        }
      })
    );
  }
}
