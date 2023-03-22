import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address.component';

const routes: Routes = [
  {
    path: '', component: AddressComponent,
    children: [
      { path: 'country', loadChildren: () => import('./country/country.module').then(m => m.CountryModule) },
      { path: 'province', loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule) },
      { path: 'district', loadChildren: () => import('./district/district.module').then(m => m.DistrictModule) },
      { path: 'sub_district', loadChildren: () => import('./sub-district/sub-district.module').then(m => m.SubDistrictModule) },
      { path: 'postcode', loadChildren: () => import('./postcode/postcode.module').then(m => m.PostcodeModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
