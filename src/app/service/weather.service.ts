import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Condition, Location } from '../model';
import { HttpUtil } from '../util/httpUtil';

@Injectable()
export class WeatherService {
  host: string;

  constructor(private http: HttpUtil) {
    this.host = environment.host;
  }

  getWeather(locationId: number): Observable<Condition> {
    const headers = new Headers({'Content-Type': 'application/json'});
    let params: URLSearchParams = new URLSearchParams();
    params.set('locationId', String(locationId));

    const options = new RequestOptions({headers: headers, search: params});

    return this.http.get(this.host + '/weather', options)
      .map(response => {
        return response.json().body;
      });
  }
}