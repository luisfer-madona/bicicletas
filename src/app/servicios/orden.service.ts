import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Orden } from '../shared/Orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  // Base url
  baseurl = 'http://localhost:8000';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  // GET
  GetOrdenes(id: number): Observable<Orden> {
    return this.http
      .get<Orden>(this.baseurl + '/ordenes/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
