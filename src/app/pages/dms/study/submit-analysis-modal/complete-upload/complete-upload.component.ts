import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete-upload',
  templateUrl: './complete-upload.component.html',
  styleUrls: ['./complete-upload.component.scss']
})
export class CompleteUploadComponent  {

  constructor() { }

  gotoDMSPortal(){
    window.open("https://dms.thakhutse.co.za/dms-ui/explorer");
  }

}
