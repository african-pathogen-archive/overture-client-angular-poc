import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { AlertsComponent } from '../alert/alerts.component';

@Injectable()
export class GlobalDataService {
  private projectIdSubject$ = new BehaviorSubject<number>(0);
  public projectId = this.projectIdSubject$
    .asObservable()
    .pipe(distinctUntilChanged());
  public _projectId: number = 0;

  constructor(private toast: MatSnackBar) {}

  // ProjectId
  public setProjectId(projectId: number): void {
    this._projectId = projectId;
    this.projectIdSubject$.next(projectId);
    console.log('******************** ', this._projectId);
  }

  public getProjectId(): number {
    return this._projectId;
  }

  // Toast
  public showToastNotification(message: string, isError: boolean) {
    const config = new MatSnackBarConfig();
    config.data = { errorMessage: isError, message: message };
    config.duration = 8000;
    config.horizontalPosition = 'right';
    config.panelClass = isError ? ['errorSnack'] : ['successSnack'];
    this.toast.openFromComponent(AlertsComponent, config);
  }
}
