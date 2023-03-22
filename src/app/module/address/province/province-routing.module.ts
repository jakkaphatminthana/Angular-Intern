import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { ProvinceSearchComponent } from './province-search/province-search.component';

const routes: Routes = [
  {path: '', component: ProvinceSearchComponent},
  {path: 'create', component: ProvinceFormComponent},
  {path: 'edit/:provinceId', component: ProvinceFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
