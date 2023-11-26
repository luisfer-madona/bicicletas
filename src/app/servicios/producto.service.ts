import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Producto } from '../shared/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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
  GetProductos(): Observable<Producto> {
    return this.http
      .get<Producto>(this.baseurl + '/productos/')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  GetProducto(id: number): Observable<Producto> {
    return this.http
      .get<Producto>(this.baseurl + '/productos/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  CreateProducto(data: Producto): Observable<Producto> {
    return this.http
      .post<Producto>(
        this.baseurl + '/productos/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  UpdateProducto(data: Producto): Observable<Producto> {
    return this.http
      .put<Producto>(
        this.baseurl + '/productos/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  DeleteProducto(id: number) {
    return this.http
      .delete<Producto>(this.baseurl + '/productos/' + id, this.httpOptions)
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
