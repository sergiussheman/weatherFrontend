import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService, AuthenticationService } from './service';

import {routing} from './app.routing';
import { AuthGuard } from './util/auth.guard';
import { UserComponent } from './user/user.component';
import { HttpUtil } from './util/httpUtil';
import { UserService } from './service/user.service';
import { PagerService } from './service/pager.service';
import { LocationComponent } from './location/location.component';
import { LocationService } from './service/location.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { WeatherService } from './service/weather.service';
import { ReportComponent } from './report/report.component';
import { QueryLogService } from './service/queryLog.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    LocationComponent,
    ReportComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    JsonpModule,
    NgSelectModule,
    AngularDateTimePickerModule,
    routing,
    ToastModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthenticationService,
    UserService,
    PagerService,
    LocationService,
    WeatherService,
    QueryLogService,
    AuthGuard,
    HttpUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
