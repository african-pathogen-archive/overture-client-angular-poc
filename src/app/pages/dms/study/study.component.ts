import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Study, StudyService } from 'nswag/song';
import { catchError, finalize } from 'rxjs';
import { PassProjectToModal } from 'src/app/shared/util/models';
import { StudyModalComponent } from './create-studies/study-modal/study-modal.component';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { SubmitAnalysisModalComponent } from './submit-analysis-modal/submit-analysis-modal.component';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  advancedFiltersAreShown = false;
  filterText = '';
  descriptionFilter = '';
  infoFilter = '';
  nameFilter = '';
  organizationFilter = '';
  studyIdFilter = '';
  loading: boolean;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;
  studies: Study[] = [];

  constructor(
    private _service: StudyService,
    private _activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStudies();
  }

  getStudies() {
    this._service
      .findAllStudiesUsingGET('body')
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .pipe(catchError((err, caught): any => {}))
      .subscribe((result: any) => {
        blobToText(result).subscribe((result200) => {
          let studyItems = JSON.parse(result200);

          if (studyItems.length > 0) {
            studyItems.forEach((studyId: string) => {
              this._service
                .getEntireStudyUsingGET(studyId, 'body')
                .subscribe((fullStudyRes) => {
                  blobToText(fullStudyRes).subscribe((result200_1) => {
                    let study200: Study = JSON.parse(result200_1);
                    this.studies.push(study200);
                    this.cdr.detectChanges();
                  });
                });
            });
          }
        });
      });
  }

  openSubmitAnalysisModal(studyId: string) {
    const data: PassProjectToModal = {
      studyId: studyId,
    };
    const dialogRef = this.dialog.open(SubmitAnalysisModalComponent, {
      minWidth: '900px',
      minHeight: '700px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.studies = [];
      this.getStudies();
    });
  }

  createStudy(): void {
    const data: PassProjectToModal = {
      studyId: '',
    };
    const dialogRef = this.dialog.open(StudyModalComponent, {
      minWidth: '900px',
      minHeight: '700px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.studies = [];
      this.getStudies();
    });
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

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null)
    );
}
