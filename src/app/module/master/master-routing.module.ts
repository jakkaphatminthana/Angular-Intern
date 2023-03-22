import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';


const routes: Routes = [
  {
    path: '', component: MasterComponent,
    children: [
      { path: 'province', loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule) },
      { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule) },
    ],
  },
  { path: 'subdistrict', loadChildren: () => import('./subdistrict/subdistrict.module').then(m => m.SubdistrictModule) },
  { path: 'postcode', loadChildren: () => import('./postcode/postcode.module').then(m => m.PostcodeModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class MasterRoutingModule { }
