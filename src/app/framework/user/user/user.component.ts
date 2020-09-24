import { DatePickerService } from './../../../Services/date-picker.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { MessageService } from './../../../Services/message.service';
import { IntercomService } from './../../../Services/intercom.service';
import { Router } from '@angular/router';
import {NgbDateStruct, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
declare var $: any;
enableProdMode();
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  errorImage = './../../../../assets/images/profile1.jpg';
  image:string;
  _uploadFileName:string;
  darkmode = this.ics.profile.darkMode;
  date: string;
  dateFmt:Date;
  constructor(private ics: IntercomService, private router: Router, private datepicker:DatePickerService,private dateAdapter: NgbDateAdapter<string>) {

  }

  ngOnInit() {

  }

  pickaDate(){
    // console.log(this.datepicker.parse(this.date));
  }

  fileChangeEvent(event,input){
    this.dateFmt = this.datepicker.changeStringToDate(this.date);
    console.log( this.dateFmt);
  }

}
