import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubdistrictRoutingModule } from './subdistrict-routing.module';
import { SubdistrictFormComponent } from './subdistrict-form/subdistrict-form.component';
import { SubdistrictListComponent } from './subdistrict-list/subdistrict-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    SubdistrictFormComponent,
    SubdistrictListComponent
  ],
  imports: [
    CommonModule,
    SubdistrictRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class SubdistrictModule { }
