import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeFormComponent } from './type-form/type-form.component';
import { TypeSearchComponent } from './type-search/type-search.component';

const routes: Routes = [
  {path: '', component: TypeSearchComponent},
  {path: 'create', component: TypeFormComponent},
  {path: 'edit/:productTypeId', component: TypeFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
