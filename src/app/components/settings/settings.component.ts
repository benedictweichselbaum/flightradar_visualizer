import {Component, OnInit} from '@angular/core';
import {FlightDataClientService} from "../../services/flight_data_service/flight-data-client.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

  urlFormControl = new FormControl()

  constructor(private flightDataService: FlightDataClientService) {
  }

  ngOnInit() {
    this.urlFormControl.setValue(this.flightDataService.getUrl())
  }

  updateUrl() {
    this.flightDataService.changeUrl(this.urlFormControl.getRawValue())
  }

}
