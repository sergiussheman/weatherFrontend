import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import { User } from '../model';

@Injectable()
export class AuthenticationService {
  token: string;
  host: string;

  constructor(private http: Http, private authService: AuthService) {
    // set token if saved in local storage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(currentUser);
    this.token = currentUser && currentUser.token;
    console.log(this.token);
    this.host = environment.host;
  }

  login(user: User): Observable<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});

    const options = new RequestOptions({headers: headers});

    return this.http.post(this.host + '/auth/login', user, options)
      .map(response => {

        const jwtToken = response.json() && response.json().body;
        console.log(jwtToken);
        if (jwtToken) {
          this.token = jwtToken.token;
          console.log(this.token);
          sessionStorage.clear();
          sessionStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            token: jwtToken.token,
            time: new Date()
          }));
          sessionStorage.setItem('authorities', JSON.stringify(jwtToken.authorities));
          this.authService.setRoles(jwtToken.authorities.map(role => {
            return role['authority']
          }));
          return true;
        } else {
          return false;
        }
      });
  }

  private showResponse(response: Response) {
    console.log(response);
  }

  private showErrors(response: Response) {
    console.log(response);
  }

  logout(): void {
    this.token = null;
    sessionStorage.removeItem('currentUser');
    this.authService.setRoles([]);
  }
}
