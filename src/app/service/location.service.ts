import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import {Location } from '../model';
import { HttpUtil } from '../util/httpUtil';

@Injectable()
export class LocationService {
  host: string;

  constructor(private http: HttpUtil) {
    this.host = environment.host;
  }

  getLocations(): Observable<Location[]> {
    const headers = new Headers({'Content-Type': 'application/json'});

    const options = new RequestOptions({headers: headers});

    return this.http.get(this.host + '/location', options)
      .map(response => {
        return response.json().body;
      });
  }

  saveOrUpdateLocation(location: Location): Observable<number> {
      const headers = new Headers({'Content-Type': 'application/json'});

      const options = new RequestOptions({headers: headers});

      return this.http.post(this.host + '/location', location, options)
        .map(response => {
            return +response.json().body;
        });
  }

  deleteLocation(location: Location): Observable<string> {
    const headers = new Headers({'Content-Type': 'application/json'});

    let params: URLSearchParams = new URLSearchParams();
    params.set('locationId', String(location.id));

    const options = new RequestOptions({headers: headers, search: params});

    return this.http.del(this.host + '/location', options)
        .map(response => {
            return response.json().body;
        });
  }
}