import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient) {}
  baseUrl: string = `${environment.BASE_URL}reviews`;

  getAllReviews(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getReviewsByFoodId(foodId: any): Observable<Product> {
    const url = `${this.baseUrl}/food/${foodId}`;
    return this.http.get<Product>(url);
  }

  AddReview(review: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, review);
  }
}
