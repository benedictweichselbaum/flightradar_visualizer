import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  public chosenTab: String;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.chosenTab = "map"
  }

  ngOnInit() {
  }

  changeTab(tabName: string) {
    this.chosenTab = tabName;
    this.router.navigate(['/' + tabName])
  }

  isActiveTab(tabName: string): boolean {
    return tabName == this.chosenTab;
  }
}
