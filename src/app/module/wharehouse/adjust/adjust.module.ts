import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjustRoutingModule } from './adjust-routing.module';
import { AdjustSearchComponent } from './adjust-search/adjust-search.component';
import { AdjustFormComponent } from './adjust-form/adjust-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdjustSearchComponent,
    AdjustFormComponent
  ],
  imports: [
    CommonModule,
    AdjustRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdjustModule { }
