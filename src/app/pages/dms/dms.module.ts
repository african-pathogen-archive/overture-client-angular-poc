import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DmsRoutingModule } from './dms-routing.module';
import { SongsComponent } from './songs/songs.component';
import { ScoresComponent } from './scores/scores.component';
import { SongsModalComponent } from './songs/create-songs/songs-modal/songs-modal.component';
import { SongsStep1Component } from './songs/create-songs/songs-step1/songs-step1.component';
import { SongsStep2Component } from './songs/create-songs/songs-step2/songs-step2.component';
import { SongsStep3Component } from './songs/create-songs/songs-step3/songs-step3.component';


@NgModule({
  declarations: [
    SongsComponent,
    ScoresComponent,
    SongsModalComponent,
    SongsStep1Component,
    SongsStep2Component,
    SongsStep3Component
  ],
  imports: [
    CommonModule,
    DmsRoutingModule
  ]
})
export class DmsModule { }
