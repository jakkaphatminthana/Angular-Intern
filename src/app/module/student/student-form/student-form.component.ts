import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  formData: FormGroup;
  studentId: string | null = null;
  countryData: any[] = [];
  provinceData: any[] = [];
  districtData: any[] = [];
  sub_districtData: any[] = [];
  postcodeData: any[] = [];

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      studentId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      studentFirstName: [null, [Validators.required, Validators.maxLength(40)]],
      studentLastName: [null, [Validators.required, Validators.maxLength(40)]],
      studentYearClass: [null, [Validators.required, Validators.min(1), Validators.max(9)]],
      studentFaculty: [null, [Validators.required]],
      studentMajor: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      districtId: [null, [Validators.required]],
      sub_districtId: [null, [Validators.required]],
      postcode: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    //For country
    this.countryData = this.appComponent.country
    this.sortCountryName(this.appComponent.country)
    //For province
    this.provinceData = this.appComponent.province
    this.sortProvinceName(this.appComponent.province)
    //For district
    this.districtData = this.appComponent.district
    this.sortDistrictName(this.appComponent.district)
    //For sub_district
    this.sub_districtData = this.appComponent.sub_district
    this.sortSubDistrictName(this.appComponent.sub_district)
    //For postcode
    this.postcodeData = this.appComponent.postcode
    this.sortPostcode(this.appComponent.postcode)

    //For student
    this.studentId = this.activatedRoute.snapshot.paramMap.get('studentId')
    if (this.studentId) {
      //จับคู่ข้อมูล, หาข้อมูล
      let studentEZ = this.appComponent.students.find((objectEZ) => {
        return objectEZ.studentId == this.studentId
      })

      //Edit mode
      if (studentEZ) {
        this.formData.patchValue(studentEZ)

        //ป้องกันเวลาเข้ามา edit แล้วเลือกจังหวัดอื่นที่ไม่เกี่ยวได้
        //1.province
        this.provinceData = this.appComponent.province.filter((objectEZ) => {
          return objectEZ.countryId == this.formData.value.countryId
        })
        //2.district
        this.districtData = this.appComponent.district.filter((objectEZ) => {
          return objectEZ.provinceId == this.formData.value.provinceId
        })
        //3.sub_district
        this.sub_districtData = this.appComponent.sub_district.filter((objectEZ) => {
          return objectEZ.districtId == this.formData.value.districtId
        })
        //4.postcode
        this.postcodeData = this.appComponent.postcode.filter((objectEZ) => {
          return objectEZ.sub_districtId == this.formData.value.sub_districtId
        })

      } else {
        this.router.navigate(['/student'])
      }
    }
  }
  //===================================================================================================
  save() {
    if (this.formData.valid) {
      let index = this.appComponent.students.findIndex((objectEZ) => {
        return objectEZ.studentId == this.formData.value.studentId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.studentId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.appComponent.students[index] = this.formData.value
        this.router.navigate(['/student'])
        //Create
      } else {
        this.appComponent.students.push(this.formData.value)
        this.router.navigate(['/student'])
      }
    }
  }

  remove() {
    let index = this.appComponent.students.findIndex((objectEZ) => {
      return objectEZ.studentId == this.formData.value.studentId;
    })
    this.appComponent.students.splice(index, 1)
    this.router.navigate(['/student'])
  }

  //กดเลือกแล้วไปเปลี่ยน Province
  countryChange() {
    this.provinceData = this.appComponent.province.filter((objectEZ) => {
      return objectEZ.countryId == this.formData.value.countryId
    })
  }
  //กดเลือกแล้วไปเปลี่ยน District
  provinceChange() {
    this.districtData = this.appComponent.district.filter((objectEZ) => {
      return objectEZ.provinceId == this.formData.value.provinceId
    })
  }
  //กดเลือกแล้วไปเปลี่ยน SubDistrict
  districtChange() {
    this.sub_districtData = this.appComponent.sub_district.filter((objectEZ) => {
      return objectEZ.districtId == this.formData.value.districtId
    })
  }
  //กดเลือกแล้วไปเปลี่ยน Postcode
  subDistrictChange() {
    this.postcodeData = this.appComponent.postcode.filter((objectEZ) => {
      return objectEZ.sub_districtId == this.formData.value.sub_districtId
    })
  }

  //---------------------------------------------------------------------------------------------------
  //1.For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.countryName > b.countryName ? 1 : -1)
  }
  countryToDescription(SubDistrict_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == SubDistrict_countryId;
    })
    return country?.countryName;
  }

  //2.For Province
  sortProvinceName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  provinceToDescription(SubDistrict_provinceId: string) {
    //หาตัวข้อมูล
    let province = this.appComponent.province.find((objectEZ) => {
      return objectEZ.provinceId == SubDistrict_provinceId;
    })
    return province?.provinceName;
  }

  //3.For District
  sortDistrictName(datas: any[]) {
    datas.sort((a, b) => a.districtName > b.districtName ? 1 : -1)
  }
  districtToDescription(SubDistrict_districtId: string) {
    //หาตัวข้อมูล
    let district = this.appComponent.district.find((objectEZ) => {
      return objectEZ.districtId == SubDistrict_districtId;
    })
    return district?.districtName;
  }

  //4.For sub_District
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

  //5.For postcode
  sortPostcode(datas: any[]) {
    datas.sort((a, b) => a.postcode > b.postcode ? 1 : -1)
  }
  postcodeToDescription(postcode_subDistrictId: string) {
    //หาตัวข้อมูล
    let postcode = this.appComponent.postcode.find((objectEZ) => {
      return objectEZ.postcode == postcode_subDistrictId;
    })
    return postcode?.postcode;
  }

}
