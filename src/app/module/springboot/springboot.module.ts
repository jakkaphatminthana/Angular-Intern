import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpringbootRoutingModule } from './springboot-routing.module';
import { RequestGetComponent } from './request-get/request-get.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestGetComponent,
  ],
  imports: [
    CommonModule,
    SpringbootRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RequestGetComponent,
  ],
})
export class SpringbootModule { }
