import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserBaseUrl: string = 'https://localhost:44318/api/Users'
 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.UserBaseUrl)
  }
}
