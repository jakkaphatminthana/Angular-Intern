import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreFormComponent } from './store-form/store-form.component';
import { StoreSearchComponent } from './store-search/store-search.component';

const routes: Routes = [
  {path: '', component: StoreSearchComponent},
  {path: 'create', component: StoreFormComponent},
  {path: 'edit/:storeId', component: StoreFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
