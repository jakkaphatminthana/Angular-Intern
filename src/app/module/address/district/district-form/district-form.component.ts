import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.scss']
})
export class DistrictFormComponent implements OnInit {

  formData: FormGroup;
  districtId: string | null = null;
  countryData: any[] = [];
  provinceData: any[] = [];

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) { 
    this.formData = this.fb.group({
      districtId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      districtName: [null, [Validators.required, Validators.maxLength(100)]],
      countryId: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
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
    this.districtId = this.activatedRoute.snapshot.paramMap.get('districtId')
    if (this.districtId) {
      //จับคู่ข้อมูล, หาข้อมูล
      let districtEZ = this.appComponent.district.find((objectEZ) => {
        return objectEZ.districtId == this.districtId
      })

      //Edit mode
      if (districtEZ) {
        this.formData.patchValue(districtEZ)
        //ป้องกันเวลาเข้ามา edit แล้วเลือกจังหวัดอื่นที่ไม่เกี่ยวได้
        this.provinceData = this.appComponent.province.filter((objectEZ) => {
          return objectEZ.countryId == this.formData.value.countryId
        })

      } else {
        this.router.navigate(['address/district'])
      }
    }
  }

  //===================================================================================================
  save() {
    if (this.formData.valid) {
      let index = this.appComponent.district.findIndex((objectEZ) => {
        return objectEZ.districtId == this.formData.value.districtId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.districtId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.appComponent.district[index] = this.formData.value
        this.router.navigate(['/address/district'])
        //Create
      } else {
        this.appComponent.district.push(this.formData.value)
        this.router.navigate(['/address/district'])
      }
    }
  }

  remove() {
    let index = this.appComponent.district.findIndex((objectEZ) => {
      return objectEZ.districtId == this.formData.value.districtId;
    })
    this.appComponent.district.splice(index, 1)
    this.router.navigate(['/address/district'])
  }

  //กดเลือกแล้วไปเปลี่ยน Province
  countryChange() {
    this.provinceData = this.appComponent.province.filter((objectEZ) => {
      return objectEZ.countryId == this.formData.value.countryId
    })
  }


  //-----------------------------------------------------------------------------
  //For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.countryName > b.countryName ? 1 : -1)
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
