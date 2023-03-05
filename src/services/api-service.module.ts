import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService } from './song.service';
import { StudiesServiceProxy } from './study.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SongService, StudiesServiceProxy],
})
export class ApiServiceModule {}
