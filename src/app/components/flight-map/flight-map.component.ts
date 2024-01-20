import {Component, OnInit} from '@angular/core';
import {FlightDataClientService} from "../../services/flight_data_service/flight-data-client.service";
import {Flight} from "../../models/flight";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './flight-map.component.html',
  styleUrl: './flight-map.component.scss'
})
export class FlightMapComponent implements OnInit{

  flights: Flight[] = []

  isRunning = false;

  constructor(private flightDataService: FlightDataClientService) {
  }

  ngOnInit() {
    this.scheduleFlightCall()
  }

  scheduleFlightCall() {
    this.isRunning = true;

    setTimeout(() => {
      console.log('Calling service method...');
      this.flightDataService.getFlights().subscribe(data => this.flights = data);

      if (this.isRunning) {
        this.scheduleFlightCall();
      }
    }, 1000);
  }

  toogleIsRunning() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.scheduleFlightCall()
    }
  }
}
