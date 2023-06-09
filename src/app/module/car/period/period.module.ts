import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodComponent } from './period.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule,
    FormsModule,
  ]
})
export class PeriodModule { }
