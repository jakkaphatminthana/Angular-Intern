import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvinceFormComponent } from './province-form/province-form.component';
import { ProvinceSearchComponent } from './province-search/province-search.component';


@NgModule({
  declarations: [
  
    ProvinceFormComponent,
       ProvinceSearchComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProvinceModule { }
