import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Book} from "../models/Book";
import { Library} from "../models/Library";
import {DataService} from '../data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public libraries: Library[];
  public libraryBooks: Book[] = [];

  constructor(private dataService: DataService) {
    dataService.getLibraries().subscribe(result => {
        this.libraries = result;  
    }, error => {
        console.error(error);
        this.libraryBooks = [];
    }); 
  }

  ngOnInit(): void { }

  filterLibrary(filterVal: any) {
         this.dataService.getLibraryBooks(filterVal).subscribe(result => {
          this.libraryBooks = result.books
         }, error =>  {
          this.libraryBooks = [];
          console.error("No record found!");
        });       
  }
}