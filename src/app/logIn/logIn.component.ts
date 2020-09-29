import { MessageService } from './../Services/message.service';
import { Component, OnInit, OnDestroy, enableProdMode } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../Services/httpClient.service';
import { IntercomService} from '../Services/intercom.service';
import { timer, Subscription } from 'rxjs';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';
import { slideInAnimation } from '../animation/animation';
declare var jQuery: any;
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
export class LogInComponent implements OnInit, OnDestroy {

  logo = '';
  darkmode = false;
  $event: any;
  subscribe: Subscription;
  obj: any = this.getDefaultObj();
  fieldControl = true;
  languageObj: any;
  selectedLanguage: any [];
  constructor(private ics: IntercomService, private http: HttpClientService, private route: Router, private msg: MessageService) {
    this.subscribe = ics.rpbean$.subscribe( x => { });
    // this.ics.sendBean(new RpBean());
    this.logo = this.ics.loginLogo;
    this.init();
   }

   selectlanguage(event) {
    if (event.target.value === 'Myanmar') {
      this.selectedLanguage = this.languageObj.Myanmar;
      this.ics.setMyanmar();
    } else {
      this.selectedLanguage = this.languageObj.English;
      this.ics.setEnglish();
    }
   }

  init(): void{
    this.http.doGet('assets/json/language.json').subscribe(
      data => {
        this.languageObj = data;
        jQuery('#customRadio').prop( 'checked', true );
        this.selectedLanguage = this.languageObj.Myanmar;
        this.ics.setMyanmar();
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
      jQuery('#switch1').prop( 'checked', true );
    }
    if(this.ics.isMyanmar){
      this.selectedLanguage = this.languageObj.Myanmar;
    }else{
      this.selectedLanguage = this.languageObj.English;
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

  ngOnDestroy() {
    // this.subscribe.unsubscribe();
  }
  // ng config -g cli.warnings.versionMismatch false
}
