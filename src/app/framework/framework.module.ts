import { UserComponent } from './user/user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
     FrameworkRoutingModule,
     FormsModule,
     NgbModule
  ],
  exports: [
    MenubarComponent,
    UserComponent
  ],
  providers: [
    IntercomService,
  ],
  bootstrap: [
     MenubarComponent
  ]
})
export class FrameworkModule { }
