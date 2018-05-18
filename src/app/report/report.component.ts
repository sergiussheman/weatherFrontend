import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { QueryLog, User, Location } from '../model';
import { QueryLogService } from '../service/queryLog.service';
import { UserService } from '../service/user.service';
import { PagerService } from '../service/pager.service';
import { LocationService } from '../service/location.service';

declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  pager: any = {};
  users: User[] = [];
  locations: Location[] = [];
  selectedUserId: number;
  allQueryLogs: QueryLog[] = [];
  queryLogs: QueryLog[] = [];
  filteredQueryLogs: QueryLog[] = [];
  selectedQueryLog: QueryLog = new QueryLog();
  countOfELementsOnPage = 5;

  // filter properties
  selectedLocation: string;
  startDate: string;
  endDate: string;

  settings = {
		bigBanner: false,
		timePicker: true,
		format: 'dd-MM-yyyy HH-mm'
	}

  constructor(private queryLogService: QueryLogService,
    private pagerService: PagerService,
    private userService: UserService,
    private locationService: LocationService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(result => {
        this.users = result;
      }, error => {
        this.toastr.error('Error while loading users. Try again later...', 'ERROR');
      });
    this.locationService.getLocations()
      .subscribe(result => {
        this.locations = result;
        this.locations.forEach((value) => {
          value.full = value.city + '(' + value.country + ')';
        })
      }, error => {
        this.toastr.error('Error while loading locations. Try again later...', 'ERROR');
      })
  }

  getQueryLogsForUser() {
    this.queryLogService.getQueryLogsForUser(this.selectedUserId)
      .subscribe(result => {
        this.queryLogs = result;
        this.allQueryLogs = this.queryLogs.slice();
        this.setPage(1);
      }, error => {
        this.toastr.error('Error while loading logs. Try again later...', 'ERROR');
      });
  }

  selectQueryLog(queryLog: QueryLog) {
    this.selectedQueryLog = queryLog;
  }

  filterQueryLogs() {
    this.queryLogs = this.allQueryLogs.filter((value) => {
      if (this.selectedLocation != null) {
        if (value.location != this.selectedLocation) {
          return false;
        }
      }
      if (this.startDate != null) {
        if (new Date(value.queryTime) < new Date(this.startDate)) {
          return false;
        }
      }
      if (this.endDate != null) {
        if (new Date(value.queryTime) > new Date(this.endDate)) {
          return false;
        }
      }
      return true;
    });
    this.setPage(1);
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.queryLogs.length, page, this.countOfELementsOnPage);
    if (this.queryLogs.length === 0) {
      this.filteredQueryLogs = [];
      return;
    }

    this.filteredQueryLogs = this.queryLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
