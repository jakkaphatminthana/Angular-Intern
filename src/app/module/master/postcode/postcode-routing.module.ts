import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostcodeFormComponent } from './postcode-form/postcode-form.component';
import { PostcodeListComponent } from './postcode-list/postcode-list.component';

const routes: Routes = [
  {path: '', component: PostcodeListComponent},
  {path: 'new', component: PostcodeFormComponent},
  {path: 'update/:id', component: PostcodeFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostcodeRoutingModule { }
