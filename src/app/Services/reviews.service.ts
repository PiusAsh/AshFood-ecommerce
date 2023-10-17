import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

constructor(private http: HttpClient) { }
reviewUrl: string = "https://localhost:44318/api/reviews";


getAllReviews():Observable<any>{
  return this.http.get<any>(this.reviewUrl);
}
getReviewsByFoodId(foodId: any): Observable<Product>{
  const url = `${this.reviewUrl}/food/${foodId}`;
return this.http.get<Product>(url)
}

AddReview(review: any): Observable<any>{
  return this.http.post<any>(this.reviewUrl, review)
}

}
