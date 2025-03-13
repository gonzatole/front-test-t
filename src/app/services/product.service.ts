import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiBaseURL}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getProductsPaginated(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchProductsByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?name=${name}`);
  }

  getTotalProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total`);
  }

  getProductsFiltered(filter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/filtered`, filter);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }

  private setHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}