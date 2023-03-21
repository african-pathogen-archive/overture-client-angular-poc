import {
  HttpHeaders,
  HttpParams,
  HttpClient,
  HttpEventType,
} from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import {
  AngularFileUploaderConfig,
  UploadInfo,
  ReplaceTexts,
} from 'angular-file-uploader';
import { SubmitService } from 'nswag/song';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ManifestFile } from '../analysis-upload/file-uploader.types';
import { Md5 } from 'ts-md5';
import { DomSanitizer } from '@angular/platform-browser';
import { UUID } from 'angular2-uuid';
import { GlobalDataService } from 'src/app/shared/util/global-data-service';
// import { ToastrService } from 'ngx-toastr';
import { UploadS3Service } from 'src/app/services/upload-s3.service';
import { ToastService } from 'src/app/services/toast.service';
// import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-create-manifest',
  templateUrl: './create-manifest.component.html',
  styleUrls: ['./create-manifest.component.scss'],
})
export class CreateManifestComponent implements OnChanges {
  // Inputs
  @Input()
  config: AngularFileUploaderConfig;

  // @Input()
  analysisId: string;

  @Input()
  studyId: string;

  @Input()
  resetUpload = false;

  // Outputs
  @Output()
  ApiResponse = new EventEmitter();

  @Output()
  fileSelected: EventEmitter<UploadInfo[]> = new EventEmitter<UploadInfo[]>();

  // Properties
  theme: string;
  id: number;
  hideProgressBar: boolean;
  maxSize: number;
  uploadAPI: string;
  method: string;
  formatsAllowed: string;
  formatsAllowedText: string;
  multiple: boolean = true;
  headers: HttpHeaders | { [header: string]: string | string[] };
  params: HttpParams | { [param: string]: string | string[] };
  responseType: 'json' | 'arraybuffer' | 'blob' | 'text';
  hideResetBtn: boolean;
  hideSelectBtn: boolean;
  allowedFiles: File[] = [];
  notAllowedFiles: {
    fileName: string;
    fileSize: string;
    errorMsg: string;
  }[] = [];
  Caption: string[] = [];
  isAllowedFileSingle = true;
  progressBarShow = false;
  enableCreateManifestBtn = false;
  enableUploadBtn = false;
  uploadMsg = false;
  afterUpload = false;
  uploadStarted = false;
  uploadMsgText: string;
  uploadMsgClass: string;
  uploadPercent: number;
  replaceTexts: ReplaceTexts;
  currentUploads: any[] = [];
  fileNameIndex = true;
  withCredentials = false;
  autoUpload = false;
  fileUrl: any;
  private idDate: number = +new Date();
  analysis: any;
  manifestName = '';
  canDownload: boolean = false;

  constructor(
    @SkipSelf() private http: HttpClient,
    private _service: SubmitService,
    private cdr: ChangeDetectorRef,
    private globalDataService: GlobalDataService,
    private sanitizer: DomSanitizer,
    private uploadS3Service: UploadS3Service,
    private toastService: ToastService
  ) {
    this.analysisId = this.globalDataService.getAnalysisId();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Track changes in Configuration and see if user has even provided Configuration.
    if (changes.config && this.config) {
      // Assign User Configurations to Library Properties.
      this.theme = this.config.theme || '';
      this.id =
        this.config.id ||
        parseInt((this.idDate / 10000).toString().split('.')[1], 10) +
          Math.floor(Math.random() * 20) * 10000;
      this.hideProgressBar = this.config.hideProgressBar || false;
      this.hideResetBtn = this.config.hideResetBtn || false;
      this.hideSelectBtn = this.config.hideSelectBtn || false;
      this.maxSize = (this.config.maxSize || 20) * 1024000; // mb to bytes.
      this.uploadAPI = this.config.uploadAPI.url;
      this.method = this.config.uploadAPI.method || 'POST';
      this.formatsAllowed = this.config.formatsAllowed || '*';
      this.formatsAllowedText =
        this.formatsAllowed === '*' ? '' : '(' + this.formatsAllowed + ')';
      this.multiple = this.config.multiple || false;
      this.headers = this.config.uploadAPI.headers || {};
      this.params = this.config.uploadAPI.params || {};
      this.responseType = this.config.uploadAPI.responseType || 'json';
      this.withCredentials = this.config.uploadAPI.withCredentials || false;
      this.fileNameIndex = this.config.fileNameIndex === false ? false : true;
      this.autoUpload = this.config.autoUpload || false;

      this.replaceTexts = {
        selectFileBtn: this.multiple ? 'Select Raw Data Files' : 'Select File',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit',
      }; // default replaceText.
      if (this.config.replaceTexts) {
        // updated replaceText if user has provided any.
        this.replaceTexts = {
          ...this.replaceTexts,
          ...this.config.replaceTexts,
        };
      }
    }

    // Reset when resetUpload value changes from false to true.
    if (changes.resetUpload) {
      if (changes.resetUpload.currentValue === true) {
        this.resetFileUpload();
      }
    }
  }

  // Reset following properties.
  resetFileUpload() {
    this.allowedFiles = [];
    this.Caption = [];
    this.notAllowedFiles = [];
    this.uploadMsg = false;
    this.enableUploadBtn = false;
    this.enableCreateManifestBtn = false;
  }

  // When user selects files.
  onChange(event: any) {
    this.fileSelected.emit(event);
    this.notAllowedFiles = [];
    const fileExtRegExp: RegExp = /(?:\.([^.]+))?$/;
    let fileList: FileList;

    if (this.afterUpload || !this.multiple) {
      this.allowedFiles = [];
      this.Caption = [];
      this.afterUpload = false;
    }

    if (event.type === 'drop') {
      fileList = event.dataTransfer.files;
    } else {
      fileList = event.target.files || event.srcElement.files;
    }

    // 'forEach' does not exist on 'filelist' that's why this good old 'for' is used.
    for (let i = 0; i < fileList.length; i++) {
      const currentFileExt = ''; // fileExtRegExp.exec(fileList[i].name)[1].toLowerCase(); // Get file extension.
      const isFormatValid = this.formatsAllowed.includes('*')
        ? true
        : this.formatsAllowed.includes(currentFileExt);

      const isSizeValid = fileList[i].size <= this.maxSize;

      // Check whether current file format and size is correct as specified in the configurations.
      if (isFormatValid && isSizeValid) {
        this.allowedFiles.push(fileList[i]);
      } else {
        this.notAllowedFiles.push({
          fileName: fileList[i].name,
          fileSize: this.convertSize(fileList[i].size),
          errorMsg: !isFormatValid ? 'Invalid format' : 'Invalid size',
        });
      }
    }

    // If there's any allowedFiles.
    if (this.allowedFiles.length > 0) {
      this.enableUploadBtn = true;
      this.enableCreateManifestBtn = true;

      // Upload the files directly if theme is attach pin (as upload btn is not there for this theme) or autoUpload is true.
      if (this.theme === 'attachPin' || this.autoUpload) {
        this.createManifest();
      }
    } else {
      this.enableUploadBtn = false;
      this.enableCreateManifestBtn = false;
    }

    this.uploadMsg = false;
    this.uploadStarted = false;
    this.uploadPercent = 0;
    event.target.value = null;
  }

  uploadDataToS3() {
    this.allowedFiles.forEach(async (uploadedFile: Blob) => {
      // let file = this.files[i];
      let file = <File>uploadedFile;

      let filePath =
        'manifest-upload/' + Math.random() * 10000000000000000 + '_' + file?.name; // to create unique name for avoiding being replaced
      try {
        let response = await this.uploadS3Service.uploadFile(file, filePath);
        console.log(response);

        this.toastService.showSuccessToast('Success', file?.name + 'uploaded Successfully :)');
        const url = (response as any).Location;
        // this.renderImages.push(url);
      } catch (error) {
        this.toastService.showErrorToast('Success', 'Something went wrong! ');
      }
    });
  }

  createManifest() {
    this.progressBarShow = true;
    this.uploadStarted = true;
    this.notAllowedFiles = [];
    let isError = false;
    this.isAllowedFileSingle = this.allowedFiles.length <= 1;
    const formData = new FormData();

    // Add data to be sent in this request
    this.allowedFiles.forEach((file, i) => {
      formData.append(
        this.Caption[i] || 'file' + (this.fileNameIndex ? i : ''),
        this.allowedFiles[i]
      );
    });

    let manifestFile = {} as ManifestFile;

    // Success
    var data = `${this.analysisId}\t\t\n`;

    this.allowedFiles.forEach((uploadedFile: Blob) => {
      const startTime = new Date().getTime();

      let fileMd5Hash = '';
      uploadedFile
        .text()
        .then((x: string) => Md5.hashAsciiStr(x))
        .then((hash: any) => {
          fileMd5Hash = hash;
          const endTime = new Date().getTime();
          console.log(
            fileMd5Hash + ' ---- ' + (endTime - startTime) / 1000,
            'seconds'
          );

          //Cast to a File() type
          let file = <File>uploadedFile;

          data += `${UUID.UUID()}\t${file.name}\t${fileMd5Hash}\n`;

          const blob = new Blob([data], { type: 'application/octet-stream' });
          console.log(data);

          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            window.URL.createObjectURL(blob)
          );
        });

      this.progressBarShow = false;
      this.enableUploadBtn = false;
      this.enableCreateManifestBtn = true;
      this.uploadMsg = true;
      this.afterUpload = true;
      this.canDownload = true;

      if (!isError) {
        this.uploadMsgText = `${this.replaceTexts.afterUploadMsg_success}`;
        this.uploadMsgClass = 'text-success lead';
      }
    });
  }

  handleErrors() {
    this.progressBarShow = false;
    this.enableUploadBtn = false;
    this.enableCreateManifestBtn = false;

    this.uploadMsg = true;
    this.afterUpload = true;
    this.uploadMsgText = this.replaceTexts.afterUploadMsg_error ?? '';
    this.uploadMsgClass = 'text-danger lead';
  }

  removeFile(i: any, sf_na: any) {
    if (sf_na === 'sf') {
      this.allowedFiles.splice(i, 1);
      this.Caption.splice(i, 1);
    } else {
      this.notAllowedFiles.splice(i, 1);
    }

    if (this.allowedFiles.length === 0) {
      this.enableUploadBtn = false;
      this.enableCreateManifestBtn = false;
    }
  }

  convertSize(fileSize: number): string {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  attachpinOnclick() {
    const element = document.getElementById('sel' + this.id);
    if (element !== null) {
      element.click();
    }
  }

  drop(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.onChange(event);
  }

  allowDrop(event: any) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
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
