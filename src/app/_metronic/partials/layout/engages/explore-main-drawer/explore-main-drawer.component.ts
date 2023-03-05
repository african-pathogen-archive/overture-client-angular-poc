import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore-main-drawer',
  templateUrl: './explore-main-drawer.component.html',
})
export class ExploreMainDrawerComponent implements OnInit {
  appThemeName: string = environment.appThemeName;
  appPurchaseUrl: string = environment.apiUrl;
  appPreviewUrl: string = environment.apiUrl;
  appDemos = environment.appDemos;

  constructor() {
  }

  ngOnInit(): void {
  }
}
