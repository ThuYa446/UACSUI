import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../../Services/message.service';
import { IntercomService } from './../../../Services/intercom.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  errorImage = './../../../../assets/images/profile1.jpg';
  image:string;
  _uploadFileName:string;
  constructor(private ics: IntercomService, private router: Router) {

  }

  ngOnInit() {

  }

}
