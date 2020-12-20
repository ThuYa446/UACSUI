import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenubarComponent} from '../framework/menubar/menubar.component';


const routes: Routes = [
  {
    path: 'menubar',
    component: MenubarComponent
  },
  {
    path: 'user',
    component: UserComponent,
    data:{animation: 'UserAnimation'}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameworkRoutingModule { }
