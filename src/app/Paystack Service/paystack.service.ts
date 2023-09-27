import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayStackService {
  private apiUrl = 'https://api.paystack.co';
  private apiKey = 'pk_test_db114057f7e1e073f3bc5d5551869e8eef51b9b1'; // Replace with your actual Paystack API key

  constructor(private http: HttpClient) {}

  initializePayment1(amount: number, email: string, reference: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });

    const body = {
      amount: amount * 100, // Amount in kobo
      email: email,
      reference: reference
    };

    return this.http.post(`${this.apiUrl}/transaction/initialize`, body, { headers });
  }

 

  initializePayment(amount: number, email: string, reference: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer pk_test_db114057f7e1e073f3bc5d5551869e8eef51b9b1` // Assuming this is your API key
    });
  
    const body = {
      amount: amount * 100, // Amount in kobo
      email: email,
      reference: reference
    };
  
    return this.http.post(`${this.apiUrl}/transaction/initialize`, body, { headers });
  }
  
  
  verifyPayment(reference: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });

    return this.http.get(`${this.apiUrl}/transaction/verify/${reference}`, { headers });
  }

  getPaymentDetailsByReference(reference: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/transaction/${reference}`, { headers });
  }
}
