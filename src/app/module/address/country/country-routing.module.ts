import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryFormComponent } from './country-form/country-form.component';
import { CountrySearchComponent } from './country-search/country-search.component';

const routes: Routes = [
  {path: '', component: CountrySearchComponent},
  {path: 'create', component: CountryFormComponent},
  {path: 'edit/:countryId', component: CountryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
