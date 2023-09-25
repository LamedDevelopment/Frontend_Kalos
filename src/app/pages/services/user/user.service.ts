import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, concatMap, last, map, Observable, of, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { ApiServiceHttp } from '../api.service';
import { User } from '../../models/user';
@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private _apiServiceHttp: ApiServiceHttp)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }


}
