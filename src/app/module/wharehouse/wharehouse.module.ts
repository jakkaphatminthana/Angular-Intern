import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WharehouseRoutingModule } from './wharehouse-routing.module';
import { WharehouseComponent } from './wharehouse.component';


@NgModule({
  declarations: [
    WharehouseComponent
  ],
  imports: [
    CommonModule,
    WharehouseRoutingModule
  ]
})
export class WharehouseModule { }
