import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceSearchComponent } from './province-search/province-search.component';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProvinceSearchComponent,
    ProvinceFormComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProvinceSearchComponent,
    ProvinceFormComponent
  ]
})
export class ProvinceModule { }
