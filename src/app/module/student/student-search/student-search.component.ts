import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss']
})
export class StudentSearchComponent implements OnInit {
  studentsList: any[] = []
  countriesData: any[] = []
  provincesData: any[] = []
  districtsData: any[] = []
  sub_districtsData: any[] = []
  postcodesData: any[] = []

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
    this.studentsList = appComponent.students;
  }

  ngOnInit(): void {
    this.sortDatas(this.appComponent.students)

    //For country
    this.sortCountryName(this.appComponent.country)
    this.countriesData = this.appComponent.country

    //For province
    this.sortProvinceName(this.appComponent.province)
    this.provincesData = this.appComponent.province

    //For district
    this.sortDistrictName(this.appComponent.district)
    this.districtsData = this.appComponent.district

    //For Sub_district
    this.sortSubDistrictName(this.appComponent.sub_district)
    this.sub_districtsData = this.appComponent.sub_district

    //For postcode
    this.sortPostcode(this.appComponent.postcode)
    this.postcodesData = this.appComponent.postcode
  }

  //========================================================================================================

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.studentId > b.studentId ? 1 : -1)
  }

  search() {
    console.log('if role')
        console.log('cId = ' + this.formCriteria.value.countryData)
        console.log('pId = ' + this.formCriteria.value.provinceData)
        console.log('dId = ' + this.formCriteria.value.districtData)
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      console.log('if role')
      //filter ข้อมูลด้วยเงื่อนไข
      this.studentsList = this.appComponent.students.filter((objectEZ) => {
        return objectEZ.countryId == this.formCriteria.value.countryData
          && objectEZ.provinceId == this.formCriteria.value.provinceData
          && objectEZ.districtId == this.formCriteria.value.districtData;
      })
    } else {
      this.studentsList = this.appComponent.students;
      console.log('else role')
    }
  }

  clear() {
    this.formCriteria.reset();
    this.studentsList = this.appComponent.students;
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
  //1.For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  countryToDescription(student_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == student_countryId;
    })
    return country?.countryName;
  }

  //2.For Province
  sortProvinceName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  provinceToDescription(student_provinceId: string) {
    //หาตัวข้อมูล
    let province = this.appComponent.province.find((objectEZ) => {
      return objectEZ.provinceId == student_provinceId;
    })
    return province?.provinceName;
  }

  //3.For District
  sortDistrictName(datas: any[]) {
    datas.sort((a, b) => a.districtName > b.districtName ? 1 : -1)
  }
  districtToDescription(student_districtId: string) {
    //หาตัวข้อมูล
    let district = this.appComponent.district.find((objectEZ) => {
      return objectEZ.districtId == student_districtId;
    })
    return district?.districtName;
  }

  //4.For Sub District
  sortSubDistrictName(datas: any[]) {
    datas.sort((a, b) => a.sub_districtName > b.sub_districtName ? 1 : -1)
  }
  subDistrictToDescription(student_districtId: string) {
    //หาตัวข้อมูล
    let sub_district = this.appComponent.sub_district.find((objectEZ) => {
      return objectEZ.sub_districtId == student_districtId;
    })
    return sub_district?.sub_districtName;
  }

  //5.For postcode
  sortPostcode(datas: any[]) {
    datas.sort((a, b) => a.postcode > b.postcode ? 1 : -1)
  }
  postcodeToDescription(student_postcode: string) {
    //หาตัวข้อมูล
    let postcode = this.appComponent.postcode.find((objectEZ) => {
      return objectEZ.postcode == student_postcode;
    })
    return postcode?.postcode;
  }

}
