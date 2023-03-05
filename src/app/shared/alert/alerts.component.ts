import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessageInfo } from '../util/models';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent implements AfterViewInit {
  error: boolean = false;
  message: string = '';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: MessageInfo,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.error = this.data.errorMessage;
    this.message = this.data.message;
    this.cd.detectChanges();
  }
}
