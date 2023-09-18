// booking.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private selectedRoomsSubject = new BehaviorSubject<any[]>([]);
  selectedRooms$ = this.selectedRoomsSubject.asObservable();

  constructor() { }

  addRoomsToBooking(rooms: any) {
    // const selectedRooms = [...this.selectedRoomsSubject.value, ...rooms];
    this.selectedRoomsSubject.next(rooms);
  }

  getSelectedRooms(): Observable<any[]> {
    return this.selectedRoomsSubject.asObservable();
  }

  // clearBooking() {
  //   this.selectedRooms = [];
  //   this.selectedRoomsSubject.next([]); // Notify subscribers
  // }
}
