import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubdistrictFormComponent } from './subdistrict-form/subdistrict-form.component';
import { SubdistrictListComponent } from './subdistrict-list/subdistrict-list.component';

const routes: Routes = [
  {path: '', component: SubdistrictListComponent},
  {path: 'new', component: SubdistrictFormComponent},
  {path: 'update/:id', component: SubdistrictFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdistrictRoutingModule { }
