import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictFormComponent } from './district-form/district-form.component';
import { DistrictSearchComponent } from './district-search/district-search.component';

const routes: Routes = [
  {path: '', component: DistrictSearchComponent},
  {path: 'create', component: DistrictFormComponent},
  {path: 'edit/:districtId', component: DistrictFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
