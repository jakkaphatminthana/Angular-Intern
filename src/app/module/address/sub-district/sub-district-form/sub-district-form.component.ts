import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sub-district-form',
  templateUrl: './sub-district-form.component.html',
  styleUrls: ['./sub-district-form.component.scss']
})
export class SubDistrictFormComponent implements OnInit {
  formData: FormGroup;
  sub_districtId: string | null = null;
  countryData: any[] = [];
  provinceData: any[] = [];
  districtData: any[] = [];

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      sub_districtId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      sub_districtName: [null, [Validators.required, Validators.maxLength(100)]],
      countryId: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      districtId: [null, [Validators.required]],
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
    this.sub_districtId = this.activatedRoute.snapshot.paramMap.get('sub_districtId')
    if (this.sub_districtId) {
      //จับคู่ข้อมูล, หาข้อมูล
      let sub_districtEZ = this.appComponent.sub_district.find((objectEZ) => {
        return objectEZ.sub_districtId == this.sub_districtId
      })

      //Edit mode
      if (sub_districtEZ) {
        this.formData.patchValue(sub_districtEZ)

        //ป้องกันเวลาเข้ามา edit แล้วเลือกจังหวัดอื่นที่ไม่เกี่ยวได้
        //1.province
        this.provinceData = this.appComponent.province.filter((objectEZ) => {
          return objectEZ.countryId == this.formData.value.countryId
        })
        //2.district
        this.districtData = this.appComponent.district.filter((objectEZ) => {
          return objectEZ.provinceId == this.formData.value.provinceId
        })

      } else {
        this.router.navigate(['address/sub_district'])
      }
    }
  }
  //===================================================================================================
  save() {
    if (this.formData.valid) {
      let index = this.appComponent.sub_district.findIndex((objectEZ) => {
        return objectEZ.sub_districtId == this.formData.value.sub_districtId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.sub_districtId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.appComponent.sub_district[index] = this.formData.value
        this.router.navigate(['/address/sub_district'])
        //Create
      } else {
        this.appComponent.sub_district.push(this.formData.value)
        this.router.navigate(['/address/sub_district'])
      }
    }
  }

  remove() {
    let index = this.appComponent.sub_district.findIndex((objectEZ) => {
      return objectEZ.sub_districtId == this.formData.value.sub_districtId;
    })
    this.appComponent.sub_district.splice(index, 1)
    this.router.navigate(['/address/sub_district'])
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

  //---------------------------------------------------------------------------------------------------
  //For Country
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

  //For Province
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

  //For District
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

}
