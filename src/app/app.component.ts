import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './service/auth.service';
import {AuthenticationService} from './service/authentication.service';
import { Router } from '@angular/router';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AuthenticationService]
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService, 
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

    ngOnInit() {
      //tick every 15 minutes
      let timer = Observable.timer(0, 15 * 60 * 1000);
      timer.subscribe(() => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null) {
          let token = currentUser && currentUser.token;
          let time = currentUser.time;
  
          //remove token if it is stale
          if (time == null || (((new Date()).getTime() - (new Date(time)).getTime()) > 30 * 60 * 1000)) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authorities');
            this.router.navigate(['/login']);
          }
        }
      });
    }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
