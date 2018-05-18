import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import { User } from '../model';
import { HttpUtil } from '../util/httpUtil';

@Injectable()
export class UserService {
  host: string;

  constructor(private http: HttpUtil) {
    this.host = environment.host;
  }

  getUsers(): Observable<User[]> {
    const headers = new Headers({'Content-Type': 'application/json'});

    const options = new RequestOptions({headers: headers});

    return this.http.get(this.host + '/user', options)
      .map(response => {
        return response.json().body;
      });
  }

  saveOrUpdateUser(user: User): Observable<number> {
      const headers = new Headers({'Content-Type': 'application/json'});

      const options = new RequestOptions({headers: headers});

      return this.http.post(this.host + '/user', user, options)
        .map(response => {
            return +response.json().body;
        });
  }

  deleteUser(user: User): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', String(user.id));

    const options = new RequestOptions({headers: headers, search: params});

    return this.http.del(this.host + '/user', options)
        .map(response => {
            return response.json().body;
        });
  }
}