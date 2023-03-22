import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubDistrictRoutingModule } from './sub-district-routing.module';
import { SubDistrictSearchComponent } from './sub-district-search/sub-district-search.component';
import { SubDistrictFormComponent } from './sub-district-form/sub-district-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubDistrictSearchComponent,
    SubDistrictFormComponent
  ],
  imports: [
    CommonModule,
    SubDistrictRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SubDistrictSearchComponent,
    SubDistrictFormComponent
  ]
})
export class SubDistrictModule { }
