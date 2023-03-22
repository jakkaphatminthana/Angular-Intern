import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-district-search',
  templateUrl: './district-search.component.html',
  styleUrls: ['./district-search.component.scss']
})
export class DistrictSearchComponent implements OnInit {
  districtsList: any[] = []
  countriesData: any[] = []
  provincesData: any[] = []

  formCriteria: FormGroup

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder
  ) {
    //กำหนดค่าเริ่มต้น
    this.formCriteria = this.fb.group({
      countryData: [null, [Validators.required]],
      provinceData: [null, [Validators.required]],
    })
    this.districtsList = appComponent.district;
  }

  ngOnInit(): void {
    this.sortDatas(this.appComponent.district)
    this.countriesData = this.appComponent.country
    this.provincesData = this.appComponent.province

    //For country read
    this.sortCountryName(this.appComponent.country)
    this.countriesData = this.appComponent.country
    //For province read
    this.sortProvinceName(this.appComponent.province)
    this.provincesData = this.appComponent.province
  }
  //========================================================================================================

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.districtId > b.districtId ? 1 : -1)
  }

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      //filter ข้อมูลด้วยเงื่อนไข
      this.districtsList = this.appComponent.district.filter((objectEZ) => {
        return objectEZ.countryId == this.formCriteria.value.countryData
          && objectEZ.provinceId == this.formCriteria.value.provinceData;
      })
    } else {
      this.districtsList = this.appComponent.district;
    }
  }

  clear() {
    this.formCriteria.reset();
    this.districtsList = this.appComponent.district;
  }

  //กดเลือกแล้วไปเปลี่ยน Province
  countryChange() {
    this.provincesData = this.appComponent.province.filter((objectEZ) => {
      return objectEZ.countryId == this.formCriteria.value.countryData
    })
  }
  
  //------------------------------------------------------------------------------------------------------------
  //For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  countryToDescription(district_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == district_countryId;
    })
    return country?.countryName;
  }

  //For Province
  sortProvinceName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  provinceToDescription(district_provinceId: string) {
    //หาตัวข้อมูล
    let province = this.appComponent.province.find((objectEZ) => {
      return objectEZ.provinceId == district_provinceId;
    })
    return province?.provinceName;
  }




}
