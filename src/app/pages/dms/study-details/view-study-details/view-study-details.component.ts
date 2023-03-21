import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudyWithDonorsData } from 'src/app/shared/util/models';
import { FormatOptions, prettyPrintJson } from 'pretty-print-json';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-study-details',
  templateUrl: './view-study-details.component.html',
  styleUrls: ['./view-study-details.component.scss'],
})
export class ViewStudyDetailsComponent implements OnInit {
  json: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: StudyWithDonorsData,

  private _sanitizer: DomSanitizer

  ) {}

  ngOnInit(): void {
    let result = JSON.stringify(this.data);

    const sanitized = this._sanitizer.sanitize(SecurityContext.STYLE, result);

    //  this._sanitizer result.replace(`"\"`, '').slice(1, -1);
    // const data = { data: sanitized };
    const options: FormatOptions = {
      linkUrls: true,
      lineNumbers: true,
      indent: 1,
      quoteKeys: true,
    };
    const elem = document.getElementById('account');
    if (elem !== null) {
      elem.innerHTML = prettyPrintJson.toHtml(sanitized);
      // this.json = prettyPrintJson.toHtml(data, options);
    }
  }
}
