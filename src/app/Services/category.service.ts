import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryUrl: string = `${environment.BASE_URL}Categories`;
  constructor(private http: HttpClient) { }


  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(`${this.categoryUrl}`);
  }
  getCategories(page, limit):Observable<any[]>{
    return this.http.get<any[]>(
      `${this.categoryUrl}?pageNumber=${page}&pageSize=${limit}`
    );
  }

  AddNewCategory(category: any):Observable<any>{
    return this.http.post<any>(`${this.categoryUrl}`,category);
  }
}
