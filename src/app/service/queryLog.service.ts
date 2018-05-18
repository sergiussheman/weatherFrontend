import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import { QueryLog } from '../model';
import { HttpUtil } from '../util/httpUtil';

@Injectable()
export class QueryLogService {
  host: string;

  constructor(private http: HttpUtil) {
    this.host = environment.host;
  }

  getQueryLogsForUser(userId: number): Observable<QueryLog[]> {
    const headers = new Headers({'Content-Type': 'application/json'});

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', String(userId));

    const options = new RequestOptions({headers: headers, search: params});

    return this.http.get(this.host + '/queryLog', options)
      .map(response => {
        return response.json().body;
      });
  }

}