import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictFormComponent } from './district-form/district-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DistrictListComponent,
    DistrictFormComponent
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class DistrictModule { }
