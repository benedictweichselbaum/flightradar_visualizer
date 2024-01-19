import { Routes } from '@angular/router';
import {FlightMapComponent} from "./components/flight-map/flight-map.component";
import {SettingsComponent} from "./components/settings/settings.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map', component: FlightMapComponent
  },
  {
    path: 'settings', component: SettingsComponent
  }
];
