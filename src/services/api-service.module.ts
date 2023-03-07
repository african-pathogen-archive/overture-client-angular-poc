import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyService } from 'nswag/song';
// import { SongService } from './song.service';
// import { StudiesServiceProxy } from './study.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StudyService],
})
export class ApiServiceModule {}
