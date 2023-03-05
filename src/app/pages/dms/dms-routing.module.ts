import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoresComponent } from './scores/scores.component';
import { SongsComponent } from './songs/songs.component';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  {
    path: 'studies',
    component: StudyComponent
  },
  {
    path: 'songs',
    component: SongsComponent,
  },
  {
    path: 'scores',
    component: ScoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmsRoutingModule { }
