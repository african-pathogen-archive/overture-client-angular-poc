import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    let token = '2860ace0-9d90-478d-920d-a0a5fde1da8b';
    // this.authService.getAuthToken().subscribe(res => {
    //   token = res?.toString() ?? '';
    // });
    return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
    })
  }
}
