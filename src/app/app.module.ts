import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import {FrameworkModule} from './framework/framework.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './logIn/logIn.component';
import { HttpClientService} from './Services/httpClient.service';
import {IntercomService} from './Services/intercom.service';

@NgModule({
   declarations: [
      AppComponent,
      LogInComponent,
   ],
   imports: [
      FrameworkModule,
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule,
      AppRoutingModule,
      NgbModule,
      FormsModule,
      HttpClientModule,
   ],
   providers: [
     IntercomService,
     HttpClientService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
