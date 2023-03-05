import { Injectable } from '@angular/core';
import { Study } from 'nswag/song/song-service-proxies';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  apiUrl: string = 'https://dms.thakhutse.co.za/song-api/studies';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
  constructor(private http: HttpClient) {}

  all(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`).pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
