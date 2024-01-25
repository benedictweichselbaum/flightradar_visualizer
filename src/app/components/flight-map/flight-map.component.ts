import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FlightDataClientService} from "../../services/flight_data_service/flight-data-client.service";
import {Flight} from "../../models/flight";
import {NgForOf} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import * as L from 'leaflet';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const iconRetinaUrl = 'assets/marker_icon/plane_2x.png';
const iconUrl = 'assets/marker_icon/plane.png';
const shadowUrl = 'assets/marker_icon/plane.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 25],
  iconAnchor: [25, 25],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [25, 25]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [
    NgForOf,
    LeafletModule,
    NgbModule
  ],
  templateUrl: './flight-map.component.html',
  styleUrl: './flight-map.component.scss'
})
export class FlightMapComponent implements OnInit, AfterViewInit {

  flights: Flight[] = []

  isRunning = false;

  private map: L.Map | null = null;

  private markers: L.Marker<any>[] = []

  private initMap(): void {
    this.map = L.map('map', {
      center: [49.499267623513205, 11.076298877163023],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private flightDataService: FlightDataClientService) {
  }

  ngOnInit() {
    this.scheduleFlightCall()
  }

  ngAfterViewInit() {
    this.initMap()
  }

  scheduleFlightCall() {
    this.isRunning = true;

    setTimeout(() => {
      this.flightDataService.getFlights().subscribe(data => {
        this.flights = data;
        this.addFlightsToMap()
      });

      if (this.isRunning) {
        this.scheduleFlightCall();
      }
    }, 3500);
  }

  toogleIsRunning() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.scheduleFlightCall()
    }
  }

  addFlightsToMap() {
    for (let marker of this.markers) {
      this.map!.removeLayer(marker);
    }

    for (let flight of this.flights) {
      const marker = L.marker([flight.latitude, flight.longitude]);
      const tooltip = this.createFlightTooltip(flight);
      marker.bindTooltip(tooltip);
      marker.bindPopup(this.createFlightPopup(flight), {
        keepInView: true,
        autoClose: false,
        autoPan: false
      })
      this.markers.push(marker);
      marker.addTo(this.map!)
    }
  }

  createFlightTooltip(flight: Flight): string {
    return '<div>' + flight.call_sign + '</div>'
  }

  createFlightPopup(flight: Flight): string {
    return '<div> Callsign: ' + flight.call_sign + '</div>' +
      '<div> Altitude: ' + flight.altitude + 'ft</div>' +
      '<div> Squawk: ' + flight.squawk + '</div>' +
      '<div><a href="http://www.flightradar24.com/' + flight.call_sign + '/" target="_blank" rel="noreferrer" class="external">Show on FlightRadar24</a></div>'
  }
}
