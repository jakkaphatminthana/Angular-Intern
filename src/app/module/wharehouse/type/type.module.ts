import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeSearchComponent } from './type-search/type-search.component';
import { TypeFormComponent } from './type-form/type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TypeSearchComponent,
    TypeFormComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TypeModule { }
