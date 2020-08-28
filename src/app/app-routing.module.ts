import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './logIn/logIn.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/logIn',
    pathMatch: 'full'   // This is the Default Route When browser Start
  },
  {
    path: 'logIn',
    component: LogInComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
