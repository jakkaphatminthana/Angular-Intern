import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QoRoutingModule } from './qo-routing.module';
import { QoComponent } from './qo.component';


@NgModule({
  declarations: [
    QoComponent
  ],
  imports: [
    CommonModule,
    QoRoutingModule
  ]
})
export class QoModule { }
