import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoRoutingModule } from './so-routing.module';
import { SoComponent } from './so.component';


@NgModule({
  declarations: [
    SoComponent
  ],
  imports: [
    CommonModule,
    SoRoutingModule
  ]
})
export class SoModule { }
