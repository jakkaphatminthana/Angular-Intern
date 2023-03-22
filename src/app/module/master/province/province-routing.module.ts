import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { ProvinceListComponent } from './province-list/province-list.component';

const routes: Routes = [
  {path: '', component: ProvinceListComponent},
  {path: 'new', component: ProvinceFormComponent},
  {path: 'update/:id', component: ProvinceFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
