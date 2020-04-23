import {Book} from "./Book";

export interface Library 
{
    id:number;
    name:string;
    books: Book[];
}