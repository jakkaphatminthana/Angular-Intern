import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictFormComponent } from './district-form/district-form.component';
import { DistrictListComponent } from './district-list/district-list.component';

const routes: Routes = [
  {path: '', component: DistrictListComponent},
  {path: 'new', component: DistrictFormComponent},
  {path: 'update/:id', component: DistrictFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
