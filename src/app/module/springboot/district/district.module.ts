import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictFormComponent } from './district-form/district-form.component';
import { DistrictSearchComponent } from './district-search/district-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DistrictFormComponent,
    DistrictSearchComponent
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DistrictFormComponent,
    DistrictSearchComponent
  ]
})
export class DistrictModule { }
