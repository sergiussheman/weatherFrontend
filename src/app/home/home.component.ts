import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LocationService } from '../service/location.service';
import { Location, Condition} from '../model';
import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];
  selectedLocationId: number;
  condition: Condition;

  constructor(private locationService: LocationService, 
    private weatherService: WeatherService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations()
      .subscribe(result => {
        this.locations = result;
      }, error => {
        console.log(error);
      });
  }

  fetchCondition() {
    this.weatherService.getWeather(this.selectedLocationId)
      .subscribe(result => {
        this.condition = result;
        console.log(result);
      }, error => {
        this.toastr.error('Weather service unavailable. Try again later', 'ERROR');
      });
  }

  checkSunCondition(sunCondition: string) {
    if(this.condition == null) {
      return false;
    }
    return this.condition.current_observation.weather.toLowerCase().indexOf(sunCondition) >= 0;
  }

}
