import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/userModel';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USERS = 'http://localhost:9192';
  loggedIn: any = true;

  constructor(
    private readonly http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    
  }
  public returnCommonHeaders(): Object{
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin' , '*');
    headers.set('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    return headers;
  }

  private httpClient<T>(method : string , url : string, data? : any) {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin' , '*');
    headers.set('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    return this.http.request<T>(method, url, {
      body: data,
      headers: headers
    });

   
  }

  public getUsers(username, password): Observable<User[]> {
    const url = this.USERS + `/login?id=${username}&password=${password}`;
    return this.httpClient<User[]>('get', url);
  }
  isUserLoggedIn(): Observable<any> {
    return this.localStorageService.observe('userHeader');
  }
  userCurrentCart(): Observable<any> {
    return this.localStorageService.observe('cart');
  }
  login(child): void {
    this.localStorageService.store('userHeader', JSON.stringify(child));
  }
}
