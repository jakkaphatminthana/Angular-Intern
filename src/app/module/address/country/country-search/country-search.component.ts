import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { AddressComponent } from '../../address.component';


@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {
  countrysList: any[] = []
  term!: string | null;
  

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder
  ) { 
    this.countrysList = this.appComponent.country;
  }

  ngOnInit(): void {
    this.sortDatas(this.appComponent.country)
  }
  //===========================================================================================================================

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.countryId > b.countryId ? 1 : -1)
  }

  filter() {
    this.countrysList = this.appComponent.country.filter((object) => {
      return object.countryName.toLowerCase().includes(this.term?.toLowerCase())
    })
  }
}
