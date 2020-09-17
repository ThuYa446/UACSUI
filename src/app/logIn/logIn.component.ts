import { Component, OnInit, OnDestroy, enableProdMode } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../Services/httpClient.service';
import { IntercomService} from '../Services/intercom.service';
import { Route } from '@angular/compiler/src/core';
import { timer, Subscription } from 'rxjs';
declare var jQuery: any;
enableProdMode();
@Component({
  selector: 'app-login',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

  logo = '';
  darkmode = false;
  $event: any;
  subscribe: Subscription;
  obj: any = this.getDefaultObj();

  constructor(private ics: IntercomService, private http: HttpClientService, private route: Router) {
    this.subscribe = ics.rpbean$.subscribe( x => { });
    // this.ics.sendBean(new RpBean());
    this.logo = this.ics.loginLogo;
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
      console.log(this.ics.profile.darkMode);
    } else {
      this.darkmode = false;
      this.ics.profile.darkMode = this.darkmode;
      console.log(this.ics.profile.darkMode);
    }
   }

  ngOnInit() {
    if (this.ics.profile.darkMode) {
      this.darkmode = true;
      jQuery('#switch1').prop( 'checked', true );
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
    this.showloading(true);
    timer(3000).subscribe(
      val => {
    // this.offCustomMsg(true);
    this.http.doPost(url, json).subscribe(
        data => {
          if (data.msgCode === '0000') {
            this.showloading(false);
            this.obj = data ;
            // JSON.parse(this.obj);
            // console.log(this.obj.userId);
            // tslint:disable-next-line: max-line-length
            this.showCustomMsg(data.msgDesc + '/' + 'UserName: ' + JSON.stringify(this.obj.userId ) + '/' + 'Password: ' + this.obj.phNo, undefined);
            // this.showCustomMsg('UserName: ' + data.userId, true);
            // this.showCustomMsg('Password: ' + data.phNo, true);
            // this.offCustomMsg(true);
            this.route.navigate(['/menubar']);
          }
        },
        error => {
          console.log(error.type);
        }
    );
    }
    );
  }

  ngOnDestroy() {
    // this.subscribe.unsubscribe();
  }
  // ng config -g cli.warnings.versionMismatch false
}
