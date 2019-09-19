import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarPosComponent } from './bar-pos/bar-pos.component';

const routes: Routes = [
  {
    path: 'bar-pos', component: BarPosComponent
  },
  {
    path: '', redirectTo: 'bar-pos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
