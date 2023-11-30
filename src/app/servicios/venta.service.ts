import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../shared/Venta';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

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
  GetVentas(): Observable<Venta> {
    return this.http
      .get<Venta>(this.baseurl + '/ventas/')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  CreateVenta(data: Venta): Observable<Venta> {
    return this.http
      .post<Venta>(
        this.baseurl + '/ventas/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  DeleteVenta(id: number) {
    return this.http
      .delete<Venta>(this.baseurl + '/ventas/' + id, this.httpOptions)
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
