import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductSearchComponent } from './product-search/product-search.component';

const routes: Routes = [
  { path: '', component: ProductSearchComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:barcode', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
