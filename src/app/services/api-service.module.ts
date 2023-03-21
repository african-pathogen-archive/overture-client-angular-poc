import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyService, SubmitService } from 'nswag/song';
import { UploadS3Service  } from './upload-s3.service';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [StudyService, SubmitService, UploadS3Service,ToastService],
})
export class ApiServiceModule {

}
