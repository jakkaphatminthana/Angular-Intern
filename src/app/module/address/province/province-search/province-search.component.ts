import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-province-search',
  templateUrl: './province-search.component.html',
  styleUrls: ['./province-search.component.scss']
})
export class ProvinceSearchComponent implements OnInit {

  provincesList: any[] = []
  countrysData: any[] = []

  formCriteria: FormGroup

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder
  ) { 
    this.formCriteria = this.fb.group({
      countryData: [null, [Validators.required]],
    })

    this.provincesList = this.appComponent.province;
  }

  ngOnInit(): void {
    this.sortDatas(this.appComponent.province)
    this.countrysData = this.appComponent.country
  }
  //===========================================================================================================================

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.provinceId > b.provinceId ? 1 : -1)
  }

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      this.provincesList = this.appComponent.province.filter((objectEZ) => {
        // console.log("main: " + objectEZ.countryId)
        // console.log("search: " + this.formCriteria.value.countryData)
        return objectEZ.countryId == this.formCriteria.value.countryData
      })
    } else {
      this.provincesList = this.appComponent.province;
    }
  }

  countryToDescription(province_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == province_countryId;
    })
    return country?.countryName;
  }

  clear() {
    this.formCriteria.reset();
    this.provincesList = this.appComponent.province;
  }


}
