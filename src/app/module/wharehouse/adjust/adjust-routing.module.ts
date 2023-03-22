import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustFormComponent } from './adjust-form/adjust-form.component';
import { AdjustSearchComponent } from './adjust-search/adjust-search.component';

const routes: Routes = [
  { path: '', component: AdjustSearchComponent },
  { path: 'create', component: AdjustFormComponent },
  { path: 'edit/:adjustId', component: AdjustFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjustRoutingModule { }
