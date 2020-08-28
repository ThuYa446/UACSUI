import { Component, OnInit, enableProdMode } from '@angular/core';
import { NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

import { IntercomService } from '../Services/intercom.service';
enableProdMode();
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'menu-bar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit {

  dropdown: NgbDropdownToggle;
  collapsed = true;
  // darkmode: boolean;
  darkmode = this.ics.profile.darkMode;
  Menu = [
    {
      menuItem: 'Menu1', MenuCaption: 'Menu001',
      SubMenu:
      [
        {menuItem: 'SubMenu1', MenuCaption: 'SubMenu01'},
        {menuItem: 'SubMenu2', MenuCaption: 'SubMenu02'},
        {menuItem: 'SubMenu3', MenuCaption: 'SubMenu03'}
      ]
    },
    {menuItem: 'Menu2', MenuCaption: 'Menu002'},
    {menuItem: 'Menu3', MenuCaption: 'Menu003'},
    {
      menuItem: 'Menu4', MenuCaption: 'Menu004',
      SubMenu:
      [
        {menuItem: 'SubMenu1', MenuCaption: 'SubMenu001'},
        {menuItem: 'SubMenu2', MenuCaption: 'SubMenu002'},
        {menuItem: 'SubMenu3', MenuCaption: 'SubMenu003'}
      ]
    },
    {menuItem: 'Menu4', MenuCaption: 'Menu005'},
  ];

  constructor(private ics: IntercomService) {
    console.log(this.ics.profile.darkMode);
  }

  ngOnInit() {

  }
}
