import { DatePickerService } from './../../Services/date-picker.service'
import { Component, OnInit, enableProdMode } from '@angular/core';
import { MessageService } from './../../Services/message.service';
import { IntercomService } from './../../Services/intercom.service';
import { Router } from '@angular/router';
import { slideInAnimation } from 'src/app/animation/animation';
import { HttpClientService } from 'src/app/Services/httpClient.service';
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
  languageObj: any;
  selectedLanguage: any [];
  date: string;
  dateFmt:Date;
  age:number;
  constructor(private ics: IntercomService,private http: HttpClientService, private router: Router, private datepicker:DatePickerService) {

  }

  init(): void{
    this.http.doGet('assets/json/language.json').subscribe(
      data => {
        this.languageObj = data;
        if(this.ics.isMyanmar()){
          this.selectedLanguage = this.languageObj.Myanmar;
        }else{
          this.selectedLanguage = this.languageObj.English;
        }
      }
    );
  }

  ngOnInit() {
    this.init();
  }

  pickaDate(){
    // console.log(this.datepicker.parse(this.date));
  }

  fileChangeEvent(event,input){
    
  }

  calculateAge(){
    this.dateFmt = this.datepicker.changeStringToDate(this.date);
    this.age = this.datepicker.calulateAge(this.dateFmt);
    // this.router.navigate(['logIn']);
  }

}
