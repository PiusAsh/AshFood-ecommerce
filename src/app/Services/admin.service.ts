import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  categoryUrl: string = "https://localhost:44359/api/RoomCategories";
  roomUrl: string = "https://localhost:44359/api/Rooms";
  
  roleUrl: string = "https://localhost:44359/api/Roles";
  reviewUrl: string = "https://localhost:44359/api/Review";
  constructor(private http: HttpClient) { }

// CATEGORY ////////////////////////////////////////////////////////////////////////////
   getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(`${this.categoryUrl}`);
  }

  AddNewCategory(category: any):Observable<any>{
    return this.http.post<any>(`${this.categoryUrl}/Add`,category);
  }

  // END OF CATEGORY//////////////////////////////////////////////////////////////////////////


// ROOM METHODS ////////////////////////////////////////////////////////////////

//END OF ROOM METHODS ////////////////////////////////////////////////////////////////
 


// ROLE METHODS//////////////////////////////////////////////////////////////////
getAllRoles():Observable<any[]>{
  return this.http.get<any[]>(`${this.roleUrl}`);
}

//END OF ROLE METHODS//////////////////////////////////////////////////////////////////

}
