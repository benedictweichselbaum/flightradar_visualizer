import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flight} from "../../models/flight";

@Injectable({
  providedIn: 'root'
})
export class FlightDataClientService {

  public currentFlights: Flight[] = []

  private url: string = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { }

  changeUrl(url: string | null) {
    if (!url) {
      this.url = '';
    }
    this.url = url!;
    console.log('Service URL: ' + this.url)
  }

  getUrl(): string {
    return this.url;
  }

   getFlights() {
    return this.httpClient.get<Flight[]>(this.url + '/fr24proxy')
  }
}
