import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}
  private PRODUCTS = 'http://localhost:9192';

  public getCrouselProduct(): Observable<Product[]> {
    const url = `${this.PRODUCTS}/crouselProduct.json`;
    return this.http.get<Product[]>(url);
  }

  public getProducts(): Observable<Product[]> {
    const url = `${this.PRODUCTS}/products`;
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin' , '*');
    headers.set('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    return this.http.get<Product[]>(url, {
      headers: headers
    });
  }
}
