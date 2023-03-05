import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Study } from 'nswag/song/song-service-proxies';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { PassProjectToModal } from 'src/app/shared/util/models';
import { StudiesServiceProxy } from 'src/services/study.service';
import { ICreateSong, song_inits } from '../../create-songs.helper';

@Component({
  selector: 'app-study-modal',
  templateUrl: './study-modal.component.html',
  styleUrls: ['./study-modal.component.scss'],
})
export class StudyModalComponent implements OnInit, OnDestroy {
  public formsCount = 3;
  public behaviorSubject$: BehaviorSubject<ICreateSong> =
    new BehaviorSubject<ICreateSong>(song_inits);
  public currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  public isCurrentFormValid$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private unsubscribe: Subscription[] = [];
  saving: boolean;

  study: Study = new Study();

  constructor(
    public dialogRef: MatDialogRef<StudyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PassProjectToModal,
    private service: StudiesServiceProxy,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('StudyModalComponent');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.saving = true;

    const currentStudy = this.behaviorSubject$.value;

    if (currentStudy === null || undefined) {
      return;
    }

    this.study.description = currentStudy.description;
    this.study.info = currentStudy.info;
    this.study.name = currentStudy.name;
    this.study.organization = currentStudy.organization;
    this.study.studyId = currentStudy.studyId;

    const sub = this.service
      .createOrEdit(this.study)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.nextStep();
      });
    this.unsubscribe.push(sub);
  }

  close() {}

  updatedStudy = (part: Partial<Study>, isFormValid: boolean) => {
    const currentStudy = this.behaviorSubject$.value;
    const updatedStudy = { ...currentStudy, ...part };
    this.behaviorSubject$.next(updatedStudy);
    this.isCurrentFormValid$.next(isFormValid);
  };

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

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
