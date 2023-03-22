import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentSearchComponent } from './student-search/student-search.component';

const routes: Routes = [
  {path: '', component: StudentSearchComponent},
  {path: 'create', component: StudentFormComponent},
  {path: 'edit/:studentId', component: StudentFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
