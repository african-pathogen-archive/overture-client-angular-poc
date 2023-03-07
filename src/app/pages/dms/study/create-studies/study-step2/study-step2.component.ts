import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICreateSong } from '../../create-songs.helper';

@Component({
  selector: 'app-study-step2',
  templateUrl: './study-step2.component.html',
  styleUrls: ['./study-step2.component.scss'],
})
export class StudyStep2Component implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: Partial<ICreateSong>,
    isFormValid: boolean
  ) => void;
  @Input() defaultValues: Partial<ICreateSong>;

  private unsubscribe: Subscription[] = [];
  public form: FormGroup;
  projectId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());
  }

  initForm() {
    this.form = this.fb.group({});

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  checkForm() {
    return true;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
