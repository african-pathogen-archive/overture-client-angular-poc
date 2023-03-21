import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmsRoutingModule } from './dms-routing.module';

import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { ApiServiceModule } from 'src/app/services/api-service.module';

import { SongsComponent } from './songs/songs.component';
import { ScoresComponent } from './scores/scores.component';
import { SongsModalComponent } from './songs/create-songs/songs-modal/songs-modal.component';
import { SongsStep1Component } from './songs/create-songs/songs-step1/songs-step1.component';
import { SongsStep2Component } from './songs/create-songs/songs-step2/songs-step2.component';
import { SongsStep3Component } from './songs/create-songs/songs-step3/songs-step3.component';
import { StudyComponent } from './study/study.component';
import { StudyModalComponent } from './study/create-studies/study-modal/study-modal.component';
import { StudyStep2Component } from './study/create-studies/study-step2/study-step2.component';
import { StudyStep3Component } from './study/create-studies/study-step3/study-step3.component';
import { StudyStep1Component } from './study/create-studies/study-step1/study-step1.component';
import { SubmitAnalysisModalComponent } from './study/submit-analysis-modal/submit-analysis-modal.component';
import { AnalysisUploadComponent } from './study/submit-analysis-modal/analysis-upload/analysis-upload.component';
import { CreateManifestComponent } from './study/submit-analysis-modal/create-manifest/create-manifest.component';
import { PublishAnalysisComponent } from './study/submit-analysis-modal/publish-analysis/publish-analysis.component';
import { CompleteUploadComponent } from './study/submit-analysis-modal/complete-upload/complete-upload.component';


@NgModule({
  declarations: [
    SongsComponent,
    ScoresComponent,
    SongsModalComponent,
    SongsStep1Component,
    SongsStep2Component,
    SongsStep3Component,
    StudyComponent,
    StudyComponent,
    StudyModalComponent,
    StudyStep2Component,
    StudyStep3Component,
    StudyStep1Component,
    SubmitAnalysisModalComponent,
    AnalysisUploadComponent,
    CreateManifestComponent,
    PublishAnalysisComponent,
    CompleteUploadComponent
  ],
  imports: [
    CommonModule,
    DmsRoutingModule,
    ApiServiceModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardsModule,
    WidgetsModule,
    LayoutModule,
    SharedModule,
    InlineSVGModule,
  ],
})
export class DmsModule { }
