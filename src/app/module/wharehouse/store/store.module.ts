import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreSearchComponent } from './store-search/store-search.component';
import { StoreFormComponent } from './store-form/store-form.component';


@NgModule({
  declarations: [
    StoreSearchComponent,
    StoreFormComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StoreModule { }
