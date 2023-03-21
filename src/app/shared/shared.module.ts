import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertsComponent } from './alert/alerts.component';
import { EllipsisPipe } from './util/ellipsis.pipe';
import { MaterialModule } from './ng-material/material.module';
import { ToastComponent } from './ng-toaster/toast/toast.component';
import { ToasterComponent } from './ng-toaster/toaster/toaster.component';

@NgModule({
  declarations: [
    EllipsisPipe,
    AlertsComponent,
    ToastComponent,
    ToasterComponent,
  ],
  entryComponents: [AlertsComponent],
  imports: [MaterialModule, CommonModule],
  exports: [EllipsisPipe, MaterialModule],
  providers: [],
})
export class SharedModule {}
