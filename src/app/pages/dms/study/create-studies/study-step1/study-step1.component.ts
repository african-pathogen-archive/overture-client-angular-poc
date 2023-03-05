import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudiesServiceProxy } from 'src/services/study.service';
import { ICreateSong } from '../../create-songs.helper';

@Component({
  selector: 'app-study-step1',
  templateUrl: './study-step1.component.html',
  styleUrls: ['./study-step1.component.scss'],
})
export class StudyStep1Component implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: Partial<ICreateSong>,
    isFormValid: boolean
  ) => void;
  @Input() defaultValues: Partial<ICreateSong>;

  private unsubscribe: Subscription[] = [];
  private filterText: string | undefined;

  public form: FormGroup;

  constructor(private _service: StudiesServiceProxy, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());
  }

  initForm() {
    this.form = this.fb.group({
      description: [
        this.defaultValues.description || '',
        [Validators.required],
      ],
      name: [this.defaultValues.name || '', [Validators.required]],
      organization: [
        this.defaultValues.organization || '',
        [Validators.required],
      ],
      studyId: [this.defaultValues.studyId || '', [Validators.required]],
    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, true);
      console.log(val);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  checkForm() {
    return !(
      this.form.get('description')?.hasError('required') ||
      this.form.get('name')?.hasError('required') ||
      this.form.get('organization')?.hasError('required') ||
      this.form.get('studyId')?.hasError('required')
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
