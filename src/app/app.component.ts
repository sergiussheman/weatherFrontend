import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './service/auth.service';
import {AuthenticationService} from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AuthenticationService]
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {}

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }
}
