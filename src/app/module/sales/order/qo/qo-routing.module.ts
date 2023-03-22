import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QoComponent } from './qo.component';

const routes: Routes = [{ path: '', component: QoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QoRoutingModule { }
