import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictSearchComponent } from './district-search/district-search.component';
import { DistrictFormComponent } from './district-form/district-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DistrictSearchComponent,
    DistrictFormComponent
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DistrictModule { }
