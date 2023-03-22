import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { ProvinceListComponent } from './province-list/province-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProvinceFormComponent,
    ProvinceListComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class ProvinceModule { }
