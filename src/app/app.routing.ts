import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './util/auth.guard';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { UserComponent } from './user/user.component';
import { LocationComponent } from './location/location.component';
import { ReportComponent } from './report/report.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    {path: 'location', component: LocationComponent, canActivate: [AuthGuard]},
    {path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
    {path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full'},

      // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
