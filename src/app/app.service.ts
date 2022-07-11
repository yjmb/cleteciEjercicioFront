import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { GenericResponse } from './models/generic-response';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  

  constructor(
    private http: HttpClient 
    
  ) {  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    }),
  };

  getAll(
  ): Observable<GenericResponse<void>> {
    return this.http
      .get<GenericResponse<void>>(
        '/api/get-all-books',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }


  createBook(book: any)
  : Observable<GenericResponse<void>> {
    return this.http
      .put<GenericResponse<void>>(
        '/api/create-book',
        JSON.stringify(book),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));

  }

  getById(id :any){
    return this.http.get('/api/get-book-by-id', id);
   }

  
   updateBook(book: any)
   : Observable<GenericResponse<void>> {
     return this.http
       .post<GenericResponse<void>>(
         '/api/update-book',
         JSON.stringify(book),
         this.httpOptions
       )
       .pipe(retry(1), catchError(this.errorHandler));
 
   }

   deleteBook(book:any){
    let httpParams = new HttpParams().set('bookId', book.id,);
    let options = { params: httpParams };
    return this.http.delete('/api/delete-book-by-id',options);
   }
  
   
   errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }


}
