import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubmitService } from 'nswag/song';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { PassProjectToModal } from 'src/app/shared/util/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit-analysis-modal',
  templateUrl: './submit-analysis-modal.component.html',
  styleUrls: ['./submit-analysis-modal.component.scss'],
})
export class SubmitAnalysisModalComponent implements OnInit {
  public currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  public isCurrentFormValid$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public formsCount = 4;

  private unsubscribe: Subscription[] = [];

  config: {
    multiple: boolean;
    formatsAllowed: string;
    maxSize: number;
    uploadAPI: {
      url: string;
      headers: { 'Content-Type': string; Authorization: string };
      // params: { page: string };
      withCredentials: boolean;
    };
    method: string;
    responseType: string;
    theme: string;
    hideProgressBar: boolean;
    hideResetBtn: boolean;
    hideSelectBtn: boolean;
    fileNameIndex: boolean;
    autoUpload: boolean;
    replaceTexts: {
      selectFileBtn: string;
      resetBtn: string;
      uploadBtn: string;
      dragNDropBox: string;
      attachPinBtn: string;
      afterUploadMsg_success: string;
      afterUploadMsg_error: string;
      sizeLimit: string;
    };
  };
  config1: {
    multiple: boolean;
    formatsAllowed: string;
    maxSize: number;
    uploadAPI: {
      url: string;
      headers: { 'Content-Type': string; Authorization: string };
      withCredentials: boolean;
    };
    method: string;
    responseType: string;
    theme: string;
    hideProgressBar: boolean;
    hideResetBtn: boolean;
    hideSelectBtn: boolean;
    fileNameIndex: boolean;
    autoUpload: boolean;
    replaceTexts: {
      selectFileBtn: string;
      resetBtn: string;
      uploadBtn: string;
      dragNDropBox: string;
      attachPinBtn: string;
      afterUploadMsg_success: string;
      afterUploadMsg_error: string;
      sizeLimit: string;
    };
  };

  studyId: string;
  jsonPayLoad: string;
  analysisId: string;

  constructor(
    private _service: SubmitService,
    @Inject(MAT_DIALOG_DATA) public data: PassProjectToModal
  ) {}
  protected basePath = 'https://dms.thakhutse.co.za/song-api';

  ngOnInit(): void {
    this.isCurrentFormValid$.next(true);

    this.studyId = this.data.studyId;

    this.config = {
      multiple: false,
      formatsAllowed: '.json',
      maxSize: 10,
      uploadAPI: {
        url: `${this.basePath}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${environment.userToken}`,
        },
        withCredentials: false,
      },
      method: 'POST',
      responseType: 'blob',
      theme: 'dragNDrop',
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false,
      fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Select Analysis File',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit',
      },
    };

    this.config1 = {
      multiple: true,
      formatsAllowed: '',
      maxSize: 100,
      uploadAPI: {
        url: `${this.basePath}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${environment.userToken}`,
        },
        withCredentials: false,
      },
      method: 'POST',
      responseType: 'blob',
      theme: 'dragNDrop',
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false,
      fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Select Raw Data Files',
        resetBtn: 'Reset',
        uploadBtn: 'Create Manifest',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Wrote manifest file!',
        afterUploadMsg_error: 'Manifest Creation Failed !',
        sizeLimit: 'Size Limit',
      },
    };
  }

  resetUpload: boolean;

  fileSelected($event: any) {
    let selectedFile = $event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
      console.log(fileReader);
      this.jsonPayLoad = fileReader.result?.toString() ?? '';
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  uploadResponse($event: any) {
    if ($event.status === 200) {
      this.isCurrentFormValid$.next(true);
    }
  }

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  onNoClick(): void {
    // this.dialogRef.close();
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
