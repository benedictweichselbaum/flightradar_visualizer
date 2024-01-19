import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FlightDataClientService} from "../../services/flight-data-client.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

  constructor(private flightDataService: FlightDataClientService) {
  }

  ngOnInit() {
  }

}
