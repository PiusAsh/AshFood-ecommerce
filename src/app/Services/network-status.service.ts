import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NetworkStatusService {
  private online = window.navigator.onLine;

  constructor() {
    window.addEventListener('online', () => {
      this.online = true;
      this.showOnlineAlert();
    });

    window.addEventListener('offline', () => {
      this.online = false;
      this.showOfflineAlert();
    });
  }

  isOnline(): boolean {
    return this.online;
  }

   showOnlineAlert() {
    Swal.fire({
      title: 'Back Online',
      text: 'You can proceed with your activities.',
      icon: 'success',
     
    });
  }

   showOfflineAlert() {
    Swal.fire({
      title: 'No Internet Connection',
      text: 'Please check your internet connection and try again.',
      icon: 'error',
      allowOutsideClick: false,
    });
  }
}
