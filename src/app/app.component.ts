import { Component, OnInit, enableProdMode } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { IntercomService } from './Services/intercom.service';
import { HttpClientService} from './Services/httpClient.service';
import { timer } from 'rxjs';
// import * as $ from 'jquery';

declare var jQuery: any;
enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  customMessage = {flag: true, msg: 'Hello', type: 'Success'};

  // tslint:disable-next-line: max-line-length
  constructor(private ics: IntercomService, private http: HttpClientService, private title: Title, private router: Router) {
    this.ics.rpbean$.subscribe(
      x => {
          if (x.t1 != null && x.t1 === 'custom-loading') {
            jQuery('#loading').modal();
          }
          if (x.t1 != null && x.t1 === 'custom-loading-off') {
            jQuery('#loading').modal('hide');
          }
          if ( x.t1 != null && x.t1 === 'custom-msg') {
            this.customMessage = { flag : false, msg: x.t2, type: x.t3 };
            jQuery('#customMsgPopup').modal({show: true});
          }
          if (x.t1 != null && x.t1 === 'custom-msg-off') {
            this.customMessage = {flag: true , msg: '' , type : ''};
            jQuery('#customMsgPopup').modal({show: false});
          }
      }
    );
    this.init();
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

  init() {
    this.http.doGet('assets/json/config.json').subscribe(
      data => {
        this.ics.title = data.title;
        this.ics.app = data.app;
        this.ics.appname = data.appname;
        this.ics.version = data.version;
        this.ics.apiurl = data.apiurl;
        this.ics.rpturl = data.rpturl;
        this.ics.welcomeText = data.welcomeText;
        this.ics.sessiontime = data.sessiontime;
        this.title.setTitle(data.title);
      }
    );
  }

  ngOnInit() {
    // this.showCustomMsg( 'Hello World, This is the Custom Modal', null);
    // this.showloading(false);
    setInterval(() => {this.checkAtive(); }, 10000 );
  }

  docChanges(event) {
    if (this.ics.profile.role > 0) {
      const dt = new Date();
      const time: number = (dt.getHours() * 3600) + (dt.getMinutes() * 60) + dt.getSeconds();
      console.log(time);
      this.ics.activeTimeout = time;
    }
  }

  checkAtive() {
    const activeTimeout = this.ics.activeTimeout;
    const date = new Date();
    const time: number = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();
    // parseInt function take two arguments, the second one is digit base format decimal(10) and binary(2)
    console.log('Time Difference:' + (time - activeTimeout ) + 'And' + (this.ics.sessiontime * 60));
    if ( (time - activeTimeout) > (parseInt (this.ics.sessiontime.toFixed(), 10) * 60) ) {
      timer(3000).subscribe(
        x => {
          const url: string = this.ics.apiurl + 'service001/signout?sessionID=' + this.ics.profile.sessionID;
          const json: any = this.ics.profile.userid;
          console.log('Entering SignOut ...');
          // this.http.doPost(url, json).subscribe(
          //   data => {
          //     if (data.state) {
          //       // jQuery("#timeoutalert").modal('hide');
          //       // this.ics._profile.role = 0;
          //       // this.ics._activeTimeout = 0;
          //       // this.ics.sendBean({ "t1": "", "t2": "", "t3": ""});
          //       // this.router.navigate(['/login']);
          //     }
          //   },
          //   error => alert(error),
          //   () => { }
          // );
        }
      );
    }

  }
}
