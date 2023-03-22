import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [{ path: '', component: OrderComponent }, { path: 'qo', loadChildren: () => import('./qo/qo.module').then(m => m.QoModule) }, { path: 'po', loadChildren: () => import('./po/po.module').then(m => m.PoModule) }, { path: 'so', loadChildren: () => import('./so/so.module').then(m => m.SoModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
