import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubDistrictFormComponent } from './sub-district-form/sub-district-form.component';
import { SubDistrictSearchComponent } from './sub-district-search/sub-district-search.component';

const routes: Routes = [
  {path: '', component: SubDistrictSearchComponent},
  {path: 'create', component: SubDistrictFormComponent},
  {path: 'edit/:sub_districtId', component: SubDistrictFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubDistrictRoutingModule { }
