import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostcodeRoutingModule } from './postcode-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostcodeSearchComponent } from './postcode-search/postcode-search.component';
import { PostcodeFormComponent } from './postcode-form/postcode-form.component';


@NgModule({
  declarations: [
  
    PostcodeSearchComponent,
       PostcodeFormComponent
  ],
  imports: [
    CommonModule,
    PostcodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PostcodeModule { }
