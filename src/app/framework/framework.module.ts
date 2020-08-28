import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenubarComponent } from '../Framework/menubar.component';
import { FrameworkRoutingModule } from '../Framework/framework-routing.module';

import {IntercomService} from '../Services/intercom.service';

@NgModule({
  declarations: [
    MenubarComponent
  ],
  imports: [
     BrowserModule,
     FrameworkRoutingModule,
     FormsModule,
     NgbModule
  ],
  exports: [
    MenubarComponent
  ],
  providers: [
    IntercomService,
  ],
  bootstrap: [
     MenubarComponent
  ]
})
export class FrameworkModule { }
