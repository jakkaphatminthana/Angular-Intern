import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountrySearchComponent } from './country-search/country-search.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CountrySearchComponent,
    CountryFormComponent,
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CountryModule { }
