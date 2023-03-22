import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';

const routes: Routes = [
  {
    path: '', component: CarComponent,
    children: [
      { path: 'period', loadChildren: () => import('./period/period.module').then(m => m.PeriodModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
