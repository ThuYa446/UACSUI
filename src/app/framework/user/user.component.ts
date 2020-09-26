import { DatePickerService } from './../../Services/date-picker.service'
import { Component, OnInit, enableProdMode } from '@angular/core';
import { MessageService } from './../../Services/message.service';
import { IntercomService } from './../../Services/intercom.service';
import { Router } from '@angular/router';
import { slideInAnimation } from 'src/app/animation/animation';
declare var $: any;
enableProdMode();
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    // slideInAnimation,
   ],
})
export class UserComponent implements OnInit {

  errorImage = './../../../../assets/images/profile1.jpg';
  image:string;
  _uploadFileName:string;
  darkmode = this.ics.profile.darkMode;
  date: string;
  dateFmt:Date;
  age:number;
  constructor(private ics: IntercomService, private router: Router, private datepicker:DatePickerService) {

  }

  ngOnInit() {

  }

  pickaDate(){
    // console.log(this.datepicker.parse(this.date));
  }

  fileChangeEvent(event,input){
    this.dateFmt = this.datepicker.changeStringToDate(this.date);
    this.age = this.datepicker.calulateAge(this.dateFmt);
    console.log( this.age);
  }

  calculateAge(){
    this.dateFmt = this.datepicker.changeStringToDate(this.date);
    this.age = this.datepicker.calulateAge(this.dateFmt);
    this.router.navigate(['logIn']);
  }

}
