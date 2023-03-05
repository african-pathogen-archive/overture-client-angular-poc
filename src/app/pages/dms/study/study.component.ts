import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Study } from 'nswag/song/song-service-proxies';
import { Observable } from 'rxjs';
import { PassProjectToModal } from 'src/app/shared/util/models';
import { SongService } from 'src/services/song.service';
import { StudiesServiceProxy } from 'src/services/study.service';
import { StudyModalComponent } from './create-studies/study-modal/study-modal.component';

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
  studies$: Observable<Study>;

  constructor(
    private _service: StudiesServiceProxy,
    private ser: SongService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStudies();
  }

  getStudies() {
    this.studies$ = this.ser.all();
    // .subscribe(result => {
    //     this.primengTableHelper.totalRecordsCount = result.totalCount;
    //     this.primengTableHelper.records = result.items;
    //     this.primengTableHelper.hideLoadingIndicator();
    // });
  }

  createStudy(): void {
    const data: PassProjectToModal = {
      projectId: 0,
    };
    const dialogRef = this.dialog.open(StudyModalComponent, {
      minWidth: '900px',
      minHeight: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getStudies();
    });
  }
}
