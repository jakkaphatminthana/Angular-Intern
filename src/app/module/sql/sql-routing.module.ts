import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SqlComponent } from './sql.component';

const routes: Routes = [{ path: '', component: SqlComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlRoutingModule { }
