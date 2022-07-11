import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: any[] = [];
  book ={
    id: 0,
    isbn: ' ',
    title: ' ',
    author: ' ',
    pageNumbers: ' ',
    editorial: ' ',
  }

  constructor(
    private appService: AppService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.appService.getAll().subscribe((data: any) => {
      this.books = data.data;

    });
  }
  
  save(): void {
    if (this.book.id){
      this.appService.updateBook(this.book).subscribe(()=> 
      this.getAll());
    }else{
      this.appService.createBook(this.book).subscribe(()=> 
      this.getAll());
    }
   
      this.book ={
        id: 0,
        isbn: ' ',
        title: ' ',
        author: ' ',
        pageNumbers: ' ',
        editorial: ' ',
      }
  }

  edit(book: any){
    this.book = {
      ...book
    }
  }

  delete (book: any){
    this.book = {
      ...book
    }
    this.appService.deleteBook(this.book).subscribe(()=> 
      this.getAll());
  }
}
