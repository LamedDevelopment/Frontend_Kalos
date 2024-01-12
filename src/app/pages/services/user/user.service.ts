import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { ApiServiceHttp } from '../api.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private _httpClient: HttpClient, private _apiServiceHttp: ApiServiceHttp) {}

  // Setter & getter for user
  set user(value: User) {
    // Almacena el valor y lo emite a los observadores
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }
}
