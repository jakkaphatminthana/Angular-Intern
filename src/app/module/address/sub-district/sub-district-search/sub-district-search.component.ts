import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sub-district-search',
  templateUrl: './sub-district-search.component.html',
  styleUrls: ['./sub-district-search.component.scss']
})
export class SubDistrictSearchComponent implements OnInit {
  sub_districtsList: any[] = []
  countriesData: any[] = []
  provincesData: any[] = []
  districtsData: any[] = []

  formCriteria: FormGroup

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder
  ) {
    //กำหนดค่าเริ่มต้น
    this.formCriteria = this.fb.group({
      countryData: [null, [Validators.required]],
      provinceData: [null, [Validators.required]],
      districtData: [null, [Validators.required]],
    })
    this.sub_districtsList = appComponent.sub_district;
  }

  ngOnInit(): void {
    this.sortDatas(this.appComponent.sub_district)

    //For country
    this.sortCountryName(this.appComponent.country)
    this.countriesData = this.appComponent.country

    //For province
    this.sortProvinceName(this.appComponent.province)
    this.provincesData = this.appComponent.province

    //For district
    this.sortDistrictName(this.appComponent.district)
    this.districtsData = this.appComponent.district
  }
  //========================================================================================================

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.sub_districtId > b.sub_districtId ? 1 : -1)
  }

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      //filter ข้อมูลด้วยเงื่อนไข
      this.sub_districtsList = this.appComponent.sub_district.filter((objectEZ) => {
        return objectEZ.countryId == this.formCriteria.value.countryData
          && objectEZ.provinceId == this.formCriteria.value.provinceData
          && objectEZ.districtId == this.formCriteria.value.districtData;
      })
    } else {
      this.sub_districtsList = this.appComponent.sub_district;
    }
  }

  clear() {
    this.formCriteria.reset();
    this.sub_districtsList = this.appComponent.sub_district;
  }

  //กดเลือกแล้วไปเปลี่ยน Province
  countryChange() {
    this.provincesData = this.appComponent.province.filter((objectEZ) => {
      return objectEZ.countryId == this.formCriteria.value.countryData
    })
  }
  //กดเลือกแล้วไปเปลี่ยน District
  provinceChange() {
    this.districtsData = this.appComponent.district.filter((objectEZ) => {
      return objectEZ.provinceId == this.formCriteria.value.provinceData
    })
  }


  //------------------------------------------------------------------------------------------------------------
  //For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  countryToDescription(subDistrict_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == subDistrict_countryId;
    })
    return country?.countryName;
  }

  //For Province
  sortProvinceName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  provinceToDescription(subDistrict_provinceId: string) {
    //หาตัวข้อมูล
    let province = this.appComponent.province.find((objectEZ) => {
      return objectEZ.provinceId == subDistrict_provinceId;
    })
    return province?.provinceName;
  }

  //For District
  sortDistrictName(datas: any[]) {
    datas.sort((a, b) => a.districtName > b.districtName ? 1 : -1)
  }
  districtToDescription(subDistrict_districtId: string) {
    //หาตัวข้อมูล
    let district = this.appComponent.district.find((objectEZ) => {
      return objectEZ.districtId == subDistrict_districtId;
    })
    return district?.districtName;
  }

}
