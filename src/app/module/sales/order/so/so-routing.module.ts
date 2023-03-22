import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoComponent } from './so.component';

const routes: Routes = [{ path: '', component: SoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoRoutingModule { }
