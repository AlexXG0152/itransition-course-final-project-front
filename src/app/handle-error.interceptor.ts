import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (typeof err.error === 'string') {
          this.toastr.error(err.error);
        } else if (typeof err.message === 'string') {
          this.toastr.error(err.message);
        } else {
          this.toastr.error(err.error.message);
        }
        if (err.status === 0) {
          this.toastr.error(err.statusText, err.status);
        }
        if (err) {
          switch (err.status) {
            case 500:
              this.toastr.error(err.error.message, err.status);
              break;
            case 422:
              this.toastr.error(err.error.message, err.status);
              break;
            case 404:
              this.toastr.error(err.error.message, err.status);
              break;
            case 403:
              this.toastr.error(err.error.message, err.status);
              break;
            case 401:
              this.toastr.error(err.error.message, err.status);
              break;
            case 400:
              this.toastr.error(err.error.message, err.status);
              break;
            case 405:
              this.toastr.error(err.error.message, err.status);
              break;
            case 409:
              this.toastr.error(err.error.message, err.status);
              break;
            default:
              this.toastr.error('Something went wrong. Contact Adminstrator');
              break;
          }
        }
        return throwError(() => err);
      })
    );
  }
}
