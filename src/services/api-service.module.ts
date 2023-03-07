import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyService, SubmitService } from 'nswag/song';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StudyService, SubmitService],
})
export class ApiServiceModule {}
