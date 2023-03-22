import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item.component';

const routes: Routes = [{ path: '', component: ItemComponent }, { path: 'stock', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
