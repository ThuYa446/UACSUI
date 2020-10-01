import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
   private mybean: any;
  apiurl = '';
  rpturl = '';
  version = '';
  title = '';
  app = '';
  appname = '';
  welcomeText = '';
  sessiontime = 0;
  loginLogo = 'assets/images/logo.png';
  bgImage = 'assets/images/background.png';
  activeTimeout = 0;
  languagemode = 1;
  profile = {
    sessionID: '0',
    userid: '',
    userName: '',
    role: 2,
    language: 0,
    darkMode: false,
    logoText: '',
    logoLink: '',
    commandCenter: true,
    btndata: [],
    menus: [],
    t1 : '',
    n1: 10,
    msgCode : '',
    msgDesc : ''
  };

  private rpbeanSource = new Subject<any>();
  rpbean$ = this.rpbeanSource.asObservable();

  constructor() { }

  sendBean(x: any) {
    this.mybean = x;
    this.rpbeanSource.next(x);
  }

  getBean(): any {
      return this.mybean;
  }

  getRole(): number {
      return this.profile.role;
  }

  isMenuBar(): boolean {
      return this.profile.role > 0;
  }

  getBtns(link) {
    const arr = this.profile.btndata;
    for ( const array of arr) {
        if (link === array.link) {
            return array.desc;
        }
    }
  }

  enabledDarkMode(): void {
    this.profile.darkMode = true;
  }

  setMyanmar(): number{
    return this.languagemode = 0;
  }

  setEnglish(): number {
    return this.languagemode = 1;
  }

  isMyanmar(): boolean {
   return this.languagemode === 0;
  }


}
