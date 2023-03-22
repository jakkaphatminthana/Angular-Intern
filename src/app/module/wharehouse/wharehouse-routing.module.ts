import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WharehouseComponent } from './wharehouse.component';

const routes: Routes = [
  {
    path: '', component: WharehouseComponent,
    children: [
      { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
      { path: 'type', loadChildren: () => import('./type/type.module').then(m => m.TypeModule) },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'adjust', loadChildren: () => import('./adjust/adjust.module').then(m => m.AdjustModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WharehouseRoutingModule { }
