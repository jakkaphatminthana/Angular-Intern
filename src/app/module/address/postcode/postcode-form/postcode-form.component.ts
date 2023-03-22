import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-postcode-form',
  templateUrl: './postcode-form.component.html',
  styleUrls: ['./postcode-form.component.scss']
})
export class PostcodeFormComponent implements OnInit {
  formData: FormGroup;
  postcode: string | null = null;
  countryData: any[] = [];
  provinceData: any[] = [];
  districtData: any[] = [];
  sub_districtData: any[] = [];

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      postcode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      countryId: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      districtId: [null, [Validators.required]],
      sub_districtId: [null, [Validators.required]],
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
    this.postcode = this.activatedRoute.snapshot.paramMap.get('postcode')
    if (this.postcode) {
      //จับคู่ข้อมูล, หาข้อมูล
      let postcodeEZ = this.appComponent.postcode.find((objectEZ) => {
        return objectEZ.postcode == this.postcode
      })

      //Edit mode
      if (postcodeEZ) {
        this.formData.patchValue(postcodeEZ)

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

      } else {
        this.router.navigate(['address/postcode'])
      }
    }
  }
  //===================================================================================================
  save() {
    if (this.formData.valid) {
      let index = this.appComponent.postcode.findIndex((objectEZ) => {
        return objectEZ.postcode == this.formData.value.postcode;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.postcode == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.appComponent.postcode[index] = this.formData.value
        this.router.navigate(['/address/postcode'])
        //Create
      } else {
        this.appComponent.postcode.push(this.formData.value)
        this.router.navigate(['/address/postcode'])
      }
    }
  }

  remove() {
    let index = this.appComponent.postcode.findIndex((objectEZ) => {
      return objectEZ.postcode == this.formData.value.postcode;
    })
    this.appComponent.postcode.splice(index, 1)
    this.router.navigate(['/address/postcode'])
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
  //กดเลือกแล้วไปเปลี่ยน sub District
  districtChange() {
    this.sub_districtData = this.appComponent.sub_district.filter((objectEZ) => {
      return objectEZ.districtId == this.formData.value.districtId
    })
  }

  //---------------------------------------------------------------------------------------------------
  //1.For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.countryName > b.countryName ? 1 : -1)
  }
  countryToDescription(postcode_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == postcode_countryId;
    })
    return country?.countryName;
  }

  //2.For Province
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

  //3.For District
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

  //4.For District
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
