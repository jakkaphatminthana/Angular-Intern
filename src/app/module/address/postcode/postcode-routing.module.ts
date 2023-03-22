import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostcodeFormComponent } from './postcode-form/postcode-form.component';
import { PostcodeSearchComponent } from './postcode-search/postcode-search.component';

const routes: Routes = [
  {path: '', component: PostcodeSearchComponent},
  {path: 'create', component: PostcodeFormComponent},
  {path: 'edit/:postcode', component: PostcodeFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostcodeRoutingModule { }
