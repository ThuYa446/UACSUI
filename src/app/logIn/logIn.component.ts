import { MessageService } from './../Services/message.service';
import { Component, OnInit, OnDestroy, enableProdMode } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../Services/httpClient.service';
import { IntercomService} from '../Services/intercom.service';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';
import { slideInAnimation } from '../animation/animation';
declare var $: any;
enableProdMode();
@Component({
  selector: 'app-login',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css'],
  animations: [
    slideInAnimation,
    trigger( 'animator',
    [
      state('animateOn', style({
        // backgroundColor: 'grey',
        opacity: 0.5,
        borderRadius: '10px',
      })),
      state('animateOff', style({
        // backgroundColor: 'white',
        opacity: 1,
        borderRadius: '50px',
      })),
     transition('animateOn <=> animateOff', [animate('1s 0.5s ease')]),
      // transition('* => animateOff', [animate('5s', keyframes([
      //   style({backgroundColor: 'green', offset: 0, opacity: 0.1}),
      //   style({backgroundColor: 'yellow', offset: 0.3 }),
      //   style({backgroundColor: 'grey', offset: 1 }),
      // ]))]),
      // transition('* => animateOn', [animate('5s', keyframes([
      //   style({backgroundColor: 'grey', offset: 0}),
      //   style({backgroundColor: 'yellow', offset: 0.8 }),
      //   style({backgroundColor: 'green', offset: 1 }),
      // ]))])
    ]),
  ],
})
export class LogInComponent implements OnInit {

  logo = '';
  darkmode = false;
  obj: any = this.getDefaultObj();
  errorMsg: string;
  
  // Language variables
  _languageObj : any = {};
  selectedLanguage : string[];
  isMyanmar = false;isEnglish = false;

  //Cookie Value
  uname = "username";
  pname = "password";
  username = "";
  password = "";
  remembercheck = false;
  url: string = "url";

  constructor(private ics: IntercomService, private http: HttpClientService, private route: Router, private msg: MessageService) {
    this.logo = this.ics.loginLogo; 
    this.init();
    this.checkCookie();
  }

  selectlanguage(event) {
    if (event.target.value === 'Myanmar') {
      this.selectedLanguage = this._languageObj.Myanmar;
      this.ics.setMyanmar();
    } else {
      this.selectedLanguage = this._languageObj.English;
      this.ics.setEnglish();
    }
  }

   validate(event: any){
    const value = event.target.value;
    // /[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
    // /((?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])).{8,}/ The String must be at least 8,one uppercase and lowercase Letter each
    const pattern = /((?=.+[0-9])(?=.+[a-z])(?=.+[A-Z])).{8,}/;
   // const key = String.fromCharCode(event.keyCode);
    if(!value.match(pattern)){
      this.errorMsg = "Password must be include at least 8,one uppercase and lowercase letter each";
    }else{
      this.errorMsg = "";
    }
  }

  init(){
    this.http.doGet('assets/json/language.json').subscribe(
      data => {
        this._languageObj = data;
        if(this.ics.isMyanmar()){
          this.selectedLanguage = this._languageObj.Myanmar;
          this.isMyanmar = true;
        }else{
          this.selectedLanguage = this._languageObj.English;
          this.isEnglish = true;
        }
      }
    );
  }

   goPost() {
     this.route.navigate(['/menubar']);
   }

   getDefaultObj() {
     return {userId: '', phNo: ''};
   }

   onchangeEvent(event) {

    if (event.target.checked) {
      this.darkmode = true;
      this.ics.profile.darkMode = this.darkmode;
    } else {
      this.darkmode = false;
      this.ics.profile.darkMode = this.darkmode;
    }
   }

  ngOnInit() {
    if (this.ics.profile.darkMode) {
        this.darkmode = true;
     }
  }

  showCustomMsg(msg, type) {
    if ( type === true) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === false) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === undefined) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === null) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  offCustomMsg(type) {
    if (type === true) {this.ics.sendBean({t1: 'custom-msg-off', t2: '', t3: ''} ); }
  }

  showloading(type) {
    if (type === true) {this.ics.sendBean({t1: 'custom-loading'}); }
    if (type === false) {this.ics.sendBean({t1: 'custom-loading-off'}); }
  }

  setremember(uname,username,pname,password,event){
    if(event.target.checked){
      this.remembercheck = true;
      if(username === "" && password === ""){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      }else{
        let d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toDateString();
        document.cookie = uname + "=" + username + ";" + expires;
        document.cookie = pname + "=" + password + ";" + expires;
        document.cookie = this.url + "=" + this.ics.apiurl + ";" + expires;
      }
    }else{
      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "url=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }

  checkCookie() {
    let value = this.readCookieUsername('username');
    let pass = this.readCookiePassword('password');
    //let urls = this.readUrl('url');
    if (value != "" && value != null && pass != "" && pass != null) {
      this.username = value;
      this.password = pass;
      this.remembercheck = true;
    } else {
      this.username = "";
      this.password = "";
      this.remembercheck = false;
    }
  }

  readCookieUsername(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

    readCookiePassword(password) {
    let nameEQ = password + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  sayHello() {
    const url = this.ics.apiurl + 'service001/greeting';
    const json: any = this.obj;
    // this.showloading(false);
   // this.showCustomMsg('Please wait....', true);
  //  this.showloading(true);
    // timer(0).subscribe(
    //   val => {
    // // this.offCustomMsg(true);
    // this.http.doPost (url, json).subscribe(
    //     data => {
    //       if (this.http.checkServerErrorConnection()) {
    //         this.showloading(false);
    //         this.showCustomMsg(this.msg.message[0], false);
    //         this.msg.clear();
    //       } else {
    //         if (data.msgCode === '0000') {
    //           this.showloading(false);
    //           this.obj = data ;
    //           // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    //           this.showCustomMsg(data.msgDesc + '/' + 'UserName: ' + this.obj.userId + '/' + 'Password: ' + this.obj.phNo + '/' + 'Syskey: ' + this.obj.keyResult, undefined);
    //           // this.showCustomMsg('UserName: ' + data.userId, true);
    //           // this.showCustomMsg('Password: ' + data.phNo, true);
    //           // this.offCustomMsg(true);
    //           this.route.navigate(['/menubar']);
    //         }
    //       }
    //     },
    // );
    // }
    // );
    this.route.navigate(['/user']);
  }

  // ng config -g cli.warnings.versionMismatch false
}
