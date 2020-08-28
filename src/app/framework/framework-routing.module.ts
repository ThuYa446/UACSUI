import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenubarComponent} from '../Framework/menubar.component';

const routes: Routes = [
  {
    path: 'menubar',
    component: MenubarComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameworkRoutingModule { }
