import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient 
  ) {  }

  createBook(book: any){
    return this.http.put('http://localhost:8080/create-book', book);
  }

  getAll(){
    return this.http.get('http://localhost:8080/get-all-books');
   }

  getById(id :any){
    return this.http.get('http://localhost:8080/get-book-by-id', id);
   }

  updateBook(book: any){
    return this.http.put('http://localhost:8080/update-book', book);
  }

   deleteBook(id :any){
    return this.http.get('http://localhost:8080/delete-book-by-id', id);
   }


}
