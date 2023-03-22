import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlRoutingModule } from './sql-routing.module';
import { SqlComponent } from './sql.component';


@NgModule({
  declarations: [
    SqlComponent
  ],
  imports: [
    CommonModule,
    SqlRoutingModule
  ]
})
export class SqlModule { }
