import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Library} from "./models/Library";

@Injectable({
  providedIn: 'root'
})
export class DataService {
 ROOT_URL = "http://localhost:8080";
 constructor(private http: HttpClient) { }

 getLibraries(){
   return this.http.get<Library[]>(`${this.ROOT_URL}/libraries`);
 }

 getLibraryBooks(id:number){
  return this.http.get<Library>(`${this.ROOT_URL}/libraries/${id}`);
}
}
