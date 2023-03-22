import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoRoutingModule } from './po-routing.module';
import { PoComponent } from './po.component';


@NgModule({
  declarations: [
    PoComponent
  ],
  imports: [
    CommonModule,
    PoRoutingModule
  ]
})
export class PoModule { }
