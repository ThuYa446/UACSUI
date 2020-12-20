import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DatePickerService } from './../Services/date-picker.service';
import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { MenubarComponent } from '../framework/menubar/menubar.component';
import { FrameworkRoutingModule } from '../framework/framework-routing.module';

import {IntercomService} from '../Services/intercom.service';

@NgModule({
  declarations: [
    MenubarComponent,
    UserComponent
  ],
  imports: [
     BrowserModule,
     BrowserAnimationsModule,
     RouterModule,
     NgbModule,
     FrameworkRoutingModule,
     FormsModule,
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
    UserComponent
  ]
})
export class FrameworkModule { }
