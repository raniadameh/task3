import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CreateUserModel, List, UserFull, UserPreview } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURL = 'https://dummyapi.io/data/v1';
  options = {
    headers: new HttpHeaders().set('app-id', '62b95602e20e2d43f1dfc3fb'),
  };

  constructor(private http: HttpClient) { }
  getUsers(): Observable<List<UserPreview>> {
    return this.http.get<List<UserPreview>>(`${this.baseURL}/user`, {
      ...this.options
      ,
      params: { created: 1 }
    });
  }
  getUserId(id: string): Observable<List<UserFull>> {
    return this.http.get<List<UserFull>>(`${this.baseURL}/user/${id}`, {
      ...this.options
    });
  }
  createUser(payload: CreateUserModel): Observable<UserFull> {
    return this.http.post<UserFull>(`${this.baseURL}/user/create`, payload, this.options).pipe(
      catchError(this.handleError),
    );
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/user/${id}`, this.options);
  }
  updateUser(id: string, newUser: any): Observable<UserFull> {
    return this.http.put<UserFull>(`${this.baseURL}/user/${id}`,newUser, this.options);
  }
  fullUser(id: string): Observable<List<UserFull>> {
    return this.http.get<List<UserFull>>(`${this.baseURL}/user/${id}`, {
      ...this.options
    });
  }
  handleError(error: HttpErrorResponse): Observable<never> {
    console.log('Inside handleError():', error);
    return throwError('some error occurred');
  }

}
