import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostcodeRoutingModule } from './postcode-routing.module';
import { PostcodeListComponent } from './postcode-list/postcode-list.component';
import { PostcodeFormComponent } from './postcode-form/postcode-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PostcodeListComponent,
    PostcodeFormComponent
  ],
  imports: [
    CommonModule,
    PostcodeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class PostcodeModule { }
