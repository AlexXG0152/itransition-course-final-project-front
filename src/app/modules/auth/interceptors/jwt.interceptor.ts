import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(environment.A_TOKEN);

    if (token) {
      const clonedReq = request.clone({
        headers: request.headers.set(`Authorization`, `Bearer ${token}`),
      });

      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }
  }
}
