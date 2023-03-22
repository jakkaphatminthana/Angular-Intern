import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';

const routes: Routes = [{ path: '', component: SalesComponent }, { path: 'pos', loadChildren: () => import('./pos/pos.module').then(m => m.PosModule) }, { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
