import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertsComponent } from './alert/alerts.component';
import { EllipsisPipe } from './util/ellipsis.pipe';
import { MaterialModule } from './ng-material/material.module';

@NgModule({
  declarations: [EllipsisPipe, AlertsComponent],
  entryComponents: [AlertsComponent],
  imports: [MaterialModule],
  exports: [EllipsisPipe, MaterialModule],
  providers: [],
})
export class SharedModule {}
