import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestGetComponent } from './request-get/request-get.component';

const routes: Routes = [
  { path: 'request-get', component: RequestGetComponent },
  { path: 'province', loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule) },
  { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule) },
  { path: 'sub-district', loadChildren: () => import('./sub-district/sub-district.module').then(m => m.SubDistrictModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpringbootRoutingModule { }
