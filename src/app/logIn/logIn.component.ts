import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../Services/httpClient.service';
import { IntercomService} from '../Services/intercom.service';
import { Route } from '@angular/compiler/src/core';

declare var jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent implements OnInit {

  logo = '';
  darkmode = false;
  $event: any;
  constructor(private ics: IntercomService, private http: HttpClientService, private route: Router) {
    this.logo = this.ics.loginLogo;
   }

   goPost() {
     this.route.navigate(['/menubar']);
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

}
