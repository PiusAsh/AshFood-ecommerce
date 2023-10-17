import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryUrl: string = "https://localhost:44318/api/Categories";
  constructor(private http: HttpClient) { }


  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(`${this.categoryUrl}`);
  }

  AddNewCategory(category: any):Observable<any>{
    return this.http.post<any>(`${this.categoryUrl}`,category);
  }
}
