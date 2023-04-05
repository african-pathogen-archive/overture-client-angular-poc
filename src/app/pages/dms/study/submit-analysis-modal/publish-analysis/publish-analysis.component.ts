import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ManagementControllerService } from 'nswag/maestro';
import { AnalysisService } from 'nswag/song';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { UploadS3Service } from 'src/app/services/upload-s3.service';
import { GlobalDataService } from 'src/app/shared/util/global-data-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publish-analysis',
  templateUrl: './publish-analysis.component.html',
  styleUrls: ['./publish-analysis.component.scss'],
})
export class PublishAnalysisComponent implements OnInit {
  @Input()
  analysisId: string;

  @Input()
  studyId: string;

  // Outputs
  @Output()
  ApiResponse = new EventEmitter();

  enableUploadBtn: boolean = false;
  progressBarShow: boolean = false;
  uploadMsg: boolean;
  uploadMsgText: any;
  uploadMsgClass: string;
  uploadPercent: number;

  constructor(
    private globalDataService: GlobalDataService,
    private sanitizer: DomSanitizer,
    private uploadS3Service: UploadS3Service,
    private toastService: ToastService,
    private analysisService: AnalysisService,
    private managementControllerService: ManagementControllerService
  ) {}

  ngOnInit(): void {
    console.log('analysisId', this.analysisId);
    console.log('studyId', this.studyId);
  }

  publishAnalysis() {
    let isError = false;

    this.analysisService
      .publishAnalysisUsingPUT(
        this.analysisId,
        this.studyId,
        `Bearer ${environment.userToken}`,
        true
      )
      .subscribe(
        (event: any) => {
          // Upload Progress
          console.log(event);

          blobToText(event.body).subscribe((result200: any) => {
            // this.analysis = JSON.parse(result200);
            // this.globalDataService.setAnalysisId(this.analysis['analysisId']); // Set again to make value avaliable to the overlay items.
          });

          if (event.type === HttpEventType.UploadProgress) {
            this.enableUploadBtn = false; // button should be disabled if process uploading
            const currentDone = event.loaded / event.total;
            this.uploadPercent = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            if (event.status === 200 || event.status === 201) {
              // Success
              this.progressBarShow = false;
              this.enableUploadBtn = false;
              this.uploadMsg = true;
              if (!isError) {
                // this.uploadMsgText = `${this.replaceTexts.afterUploadMsg_success}`;
                this.uploadMsgClass = 'text-success lead';
              }

              this.toastService.showSuccessToast('Success', 'Testing :)');
            } else {
              // Failure
              isError = true;
              this.handleErrors();
            }

            this.ApiResponse.emit(event);
          } else {
            //console.log('Event Other: ', event);
          }
        },
        (error) => {
          // Failure
          isError = true;
          this.handleErrors();
          this.ApiResponse.emit(error);
        }
      );
  }

  indexStudy() {
    let isError = false;

    this.managementControllerService
      .indexStudy(
        this.studyId,
        'song.overture',
        "body",
        true,
      )
      .subscribe(
        (event: any) => {
          // Upload Progress
          console.log(event);

          blobToText(event.body).subscribe((result200: any) => {
            // this.analysis = JSON.parse(result200);
            // this.globalDataService.setAnalysisId(this.analysis['analysisId']); // Set again to make value avaliable to the overlay items.
          });

          if (event.type === HttpEventType.UploadProgress) {
            this.enableUploadBtn = false; // button should be disabled if process uploading
            const currentDone = event.loaded / event.total;
            this.uploadPercent = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            if (event.status === 200 || event.status === 201) {
              // Success
              this.progressBarShow = false;
              this.enableUploadBtn = false;
              this.uploadMsg = true;
              if (!isError) {
                // this.uploadMsgText = `${this.replaceTexts.afterUploadMsg_success}`;
                this.uploadMsgClass = 'text-success lead';
              }

              this.toastService.showSuccessToast('Success', 'Testing :)');
            } else {
              // Failure
              isError = true;
              this.handleErrors();
            }

            this.ApiResponse.emit(event);
          } else {
            //console.log('Event Other: ', event);
          }
        },
        (error) => {
          // Failure
          isError = true;
          this.handleErrors();
          this.ApiResponse.emit(error);
        }
      );
  }

  handleErrors() {
    this.progressBarShow = false;
    this.enableUploadBtn = false;
    this.uploadMsg = true;
    // this.uploadMsgText = this.replaceTexts.afterUploadMsg_error ?? '';
    this.uploadMsgClass = 'text-danger lead';
  }

}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
