import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { AlertsComponent } from '../alert/alerts.component';

@Injectable()
export class GlobalDataService {
  private analysisIdSubject$ = new BehaviorSubject<string>('');
  public analysisId = this.analysisIdSubject$.asObservable().pipe(distinctUntilChanged());
  public _analysisId: string = '';

  constructor(private toast: MatSnackBar) {}

  // AnalysisId
  public setAnalysisId(analysisId: string): void {
    this._analysisId = analysisId;
    this.analysisIdSubject$.next(analysisId);
    console.log('******************** ', this._analysisId);
  }

  public getAnalysisId(): string {
    return this._analysisId;
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
