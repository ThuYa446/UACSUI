import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DatePickerService } from './../Services/date-picker.service';
import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { MenubarComponent } from '../Framework/menubar.component';
import { FrameworkRoutingModule } from '../Framework/framework-routing.module';

import {IntercomService} from '../Services/intercom.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    MenubarComponent,
    UserComponent
  ],
  imports: [
     BrowserModule,
     BrowserAnimationsModule,
     RouterModule,
     FrameworkRoutingModule,
     FormsModule,
     NgbModule,

  ],
  exports: [
    MenubarComponent,
    UserComponent
  ],
  providers: [
    IntercomService,
    DatePickerService,
    {provide: NgbDateParserFormatter, useClass: DatePickerService},
  ],
  bootstrap: [
     MenubarComponent
  ]
})
export class FrameworkModule { }
