import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
        
          const errorMessage = 'API is not available. ';
         

          Swal.fire({
            icon: 'error',
            title: errorMessage,
            text: 'Please try again later.',
            // iconColor: '#ff6100',
            confirmButtonText: 'Close',
            allowOutsideClick: false,
          });
          console.error(errorMessage);
        }
        return throwError(error);
      })
    );
  }
}
