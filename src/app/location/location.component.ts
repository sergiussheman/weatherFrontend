import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocationService } from '../service/location.service';
import { ToastsManager } from 'ng2-toastr';
import {Location } from '../model';
import { PagerService } from '../service/pager.service';

declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  pager: any = {};
  allLocations: Location[] = [];
  locations: Location[] = [];
  editLocation: Location = new Location();
  countOfELementsOnPage = 2;


  constructor(private locationService: LocationService,
    private pagerService: PagerService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.updateLocations();
  }

  setEditLocation(location: Location) {
    this.editLocation = Object.assign({}, location);
  }

  saveLocation() {
    if(this.editLocation.country == null || this.editLocation.country === '') {
      this.toastr.error('You must enter country', 'ERROR');
      return;
    }
    if(this.editLocation.city == null || this.editLocation.city == '') {
      this.toastr.error('You must enter city', 'ERROR');
      return;
    }
    this.locationService.saveOrUpdateLocation(this.editLocation)
      .subscribe(result => {
        this.toastr.success('Location was updated', 'SUCCESS');
        this.updateLocations();
        $('#editLocationModal').modal('hide');
      }, error => {
        this.toastr.error('Error while saving location', 'ERROR');
      })
  }

  deleteSelectedLocations() {
    this.locations.forEach((value) => {
      if(value.selected) {
        this.deleteLocation(value);
      }
    });
  }

  selectLocation(location: Location) {
    location.selected = true;
  }

  deleteLocation(location: Location) {
    this.locationService.deleteLocation(location)
      .subscribe(response => {
        if(response === 'OK') {
          this.toastr.success('Location was deleted', 'SUCCESS');
          $('#deleteLocationModal').modal('hide');
          this.locations.splice(this.locations.indexOf(location), 1);
        }
      }, error => {
        this.toastr.error('Error while deleting user', 'ERROR');
      });
  }

  private updateLocations() {
    this.locationService.getLocations()
      .subscribe(result => {
        this.allLocations = result;
        this.setPage(1);
      });
  }

  private setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allLocations.length, page, this.countOfELementsOnPage);
    if(this.allLocations.length === 0) {
      this.locations = [];
      return;
    }

    this.locations = this.allLocations.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
