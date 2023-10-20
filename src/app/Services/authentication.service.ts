import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
baseUrl: string = 'https://localhost:44318/api/'
private loggedIn = false;
  private userId: number;
// login?email=agbae%40gmail.com&password=ash
  constructor(private http: HttpClient) {
      // Check if the user is logged in based on your authentication logic
      this.loggedIn = !!localStorage.getItem('userId');
      // this.userId = +localStorage.getItem('userId');
   }
  
  
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserById(userId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}Users/${userId}`);
  }
  
  login(loginBody: any): Observable<any>{
  var queryParam = `login?email=${loginBody.email}&password=${loginBody.password}`
  return this.http.post<any>(`${this.baseUrl}${queryParam}`, loginBody)
  }

  loginRequest(loginDto: any): Observable<any> {
   
    return this.http.post(`${this.baseUrl}Auth/login`, loginDto);
  }
  // loginRequest(email: string, password: string): Observable<any> {
  //   const loginBody = { email, password };
  //   return this.http.post(`${this.baseUrl}login`, loginBody);
  // }


  register(profileDto: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Auth/register`, profileDto);
  }
}
