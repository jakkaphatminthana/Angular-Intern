import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-postcode-search',
  templateUrl: './postcode-search.component.html',
  styleUrls: ['./postcode-search.component.scss']
})
export class PostcodeSearchComponent implements OnInit {
  postcodesList: any[] = []
  countriesData: any[] = []
  provincesData: any[] = []
  districtsData: any[] = []
  sub_districtsData: any[] = []

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
      sub_districtData: [null, [Validators.required]],
    })
    this.postcodesList = appComponent.postcode;
  }

  ngOnInit(): void {
    this.sortDatas(this.appComponent.postcode)

    //For country
    this.sortCountryName(this.appComponent.country)
    this.countriesData = this.appComponent.country

    //For province
    this.sortProvinceName(this.appComponent.province)
    this.provincesData = this.appComponent.province

    //For district
    this.sortDistrictName(this.appComponent.district)
    this.districtsData = this.appComponent.district

    //For sub district
    this.sortSubDistrictName(this.appComponent.sub_district)
    this.sub_districtsData = this.appComponent.sub_district
  }
  //========================================================================================================
  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.postcode > b.postcode ? 1 : -1)
  }

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      //filter ข้อมูลด้วยเงื่อนไข
      this.postcodesList = this.appComponent.postcode.filter((objectEZ) => {
        return objectEZ.countryId == this.formCriteria.value.countryData
          && objectEZ.provinceId == this.formCriteria.value.provinceData
          && objectEZ.districtId == this.formCriteria.value.districtData
          && objectEZ.sub_districtId == this.formCriteria.value.sub_districtData;
      })
    } else {
      this.postcodesList = this.appComponent.postcode;
    }
  }

  clear() {
    this.formCriteria.reset();
    this.postcodesList = this.appComponent.postcode;
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
  //กดเลือกแล้วไปเปลี่ยน SubDistrict
  districtChange() {
    this.sub_districtsData = this.appComponent.sub_district.filter((objectEZ) => {
      return objectEZ.districtId == this.formCriteria.value.districtData
    })
  }


  //------------------------------------------------------------------------------------------------------------
  //For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  countryToDescription(postcode_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == postcode_countryId;
    })
    return country?.countryName;
  }

  //For Province
  sortProvinceName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  provinceToDescription(postcode_provinceId: string) {
    //หาตัวข้อมูล
    let province = this.appComponent.province.find((objectEZ) => {
      return objectEZ.provinceId == postcode_provinceId;
    })
    return province?.provinceName;
  }

  //For District
  sortDistrictName(datas: any[]) {
    datas.sort((a, b) => a.districtName > b.districtName ? 1 : -1)
  }
  districtToDescription(postcode_districtId: string) {
    //หาตัวข้อมูล
    let district = this.appComponent.district.find((objectEZ) => {
      return objectEZ.districtId == postcode_districtId;
    })
    return district?.districtName;
  }

  //For sub_District
  sortSubDistrictName(datas: any[]) {
    datas.sort((a, b) => a.sub_districtName > b.sub_districtName ? 1 : -1)
  }
  subDistrictToDescription(postcode_subDistrictId: string) {
    //หาตัวข้อมูล
    let sub_district = this.appComponent.sub_district.find((objectEZ) => {
      return objectEZ.sub_districtId == postcode_subDistrictId;
    })
    return sub_district?.sub_districtName;
  }

}
