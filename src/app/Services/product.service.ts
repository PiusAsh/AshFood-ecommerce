import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../Models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl: string = `${environment.BASE_URL}products`;

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  products: Product;
  // getAllProducts():Observable<any[]>{
  //   return this.http.get<any[]>(`${this.baseUrl}`);
  // }

  addNewProduct(room: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, room);
  }
  getProductId(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/` + id);
  }
  getReviewsByRoomyId(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetByRoom/` + id);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
  getProducts(page, limit): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?pageNumber=${page}&pageSize=${limit}`);
  }

  UpdateProduct(id: any, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  // getAllProducts(): Observable<Product[]> {
  //   this.http.get<Product[]>(this.baseUrl).subscribe(
  //     (products) => this.productsSubject.next(products)
  //   );
  //   return this.products$;
  // }

  getFoodById(foodID: string): Observable<Product> {
    const url = `${this.baseUrl}/${foodID}`;
    return this.http.get<Product>(url);
  }

  getAllFoodsBySearch(searchTerm: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) =>
        products.filter((x) =>
          x.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  // getAllFoodsBySearch(searchTerm: string){
  // return this.getAllProducts().filter(x => x.category.toLowerCase().includes(searchTerm.toLowerCase()))
  // }

  // getFoodById1(foodID: string): any{
  //     return this.getAllProducts().find(x => x.food.id === foodID) ?? new Food()
  // }
  // getFoodById(foodID: string): Product {
  //   console.log(foodID, 'foodID', foodID);
  //   const foundFood = this.products.find(product => product.id === parseInt(foodID));
  //   return foundFood ?? new Product();
  // }

  getFoodByIde(foodID: string): any {
    const allProducts = this.getAllProducts();
    if (Array.isArray(allProducts)) {
      const foundFood = allProducts.find((x) => x.food.id === foodID);
      if (foundFood) {
        return foundFood;
      }
    }
    return new Product();
  }
}
