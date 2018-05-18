import { Component, NgModule, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpModule, JsonpModule } from '@angular/http';
import { AuthenticationService } from '../service/index';
import { Observable } from 'rxjs/Observable';
import { User } from '../model';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User = new User();
  denddate: string;
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(_vcr);
     }

  ngOnInit() {
    this.authenticationService.logout();

    // tick every 15 minutes
    setInterval(() => {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (currentUser != null) {
        const token = currentUser && currentUser.token;
        const time = currentUser.time;

        // remove token if it is stale
        if (time == null || (((new Date()).getTime() - (new Date(time)).getTime()) > 30 * 60 * 1000)) {
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('authorities');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  login() {
    this.loading = true;
    const user = new User();
    user.username = this.model.username;
    user.password = this.model.password;
    this.authenticationService.login(user)
      .subscribe(result => {
        console.log(result);
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, error => {
        this.toastr.error('Error', 'Wrong credentials');
        this.loading = false;
      });
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
