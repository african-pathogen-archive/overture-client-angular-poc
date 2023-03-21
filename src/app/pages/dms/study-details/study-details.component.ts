import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudyService, Study, StudyWithDonors } from 'nswag/song';
import { finalize, catchError, Subscription, Observable } from 'rxjs';
import { ViewStudyDetailsComponent } from './view-study-details/view-study-details.component';

@Component({
  selector: 'app-study-details',
  templateUrl: './study-details.component.html',
  styleUrls: ['./study-details.component.scss']
})
export class StudyDetailsComponent implements OnInit, OnDestroy {

  @Input() cssClass = 'card card-xl-stretch mb-xl-8';
  @Input() widgetHeight = '150px';
  @Input() color: string = 'primary';
  @Input() baseColor = 'success';
  textInverseCSSClass = '';
  private routeSub: Subscription;
  loading: boolean;
  study: StudyWithDonors = {};

  constructor(
    private _service: StudyService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cssClass = `bg-${this.baseColor} ${this.cssClass}`;
    this.textInverseCSSClass = `text-inverse-${this.baseColor}`;

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
      let studyId = params['id'];

    this.getStudies(studyId);

    });
  }

  getStudies(studyId: string) {
    this._service
      .getEntireStudyUsingGET(studyId, 'body')
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .pipe(catchError((err, caught): any => {}))
      .subscribe((result: any) => {
        blobToText(result).subscribe((result200) => {
          // console.log(result200)
          this.study = JSON.parse(result200) as StudyWithDonors;
          console.log(this.study)

        });
      });
  }


  openStudyDetails(data: StudyWithDonors) {
    const dialogRef = this.dialog.open(ViewStudyDetailsComponent, {
      minWidth: '900px',
      minHeight: '700px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }


  ngOnDestroy() {
    this.routeSub.unsubscribe();
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
