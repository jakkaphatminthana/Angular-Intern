import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html',
  styleUrls: ['./province-form.component.scss']
})
export class ProvinceFormComponent implements OnInit {
  formData: FormGroup;
  provinceId: string | null = null;
  countryData: any[] = [];

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) { 
    this.formData = this.fb.group({
      provinceId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      provinceName: [null, [Validators.required, Validators.maxLength(100)]],
      countryId: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    //For country
    this.countryData = this.appComponent.country
    this.sortCountryName(this.appComponent.country)

    //For province
    this.provinceId = this.activatedRoute.snapshot.paramMap.get('provinceId')
    if (this.provinceId) {
      //จับคู่ข้อมูล, หาข้อมูล
      let provinceEZ = this.appComponent.province.find((objectEZ) => {
        return objectEZ.provinceId == this.provinceId
      })

      if (provinceEZ) {
        this.formData.patchValue(provinceEZ)
      } else {
        this.router.navigate(['address/province'])
      }
    }
  }

  //====================================================================================================================================
  save() {
    if (this.formData.valid) {
      let index = this.appComponent.province.findIndex((objectEZ) => {
        return objectEZ.provinceId == this.formData.value.provinceId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.provinceId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.appComponent.province[index] = this.formData.value
        this.router.navigate(['/address/province'])
        //Create
      } else {
        this.appComponent.province.push(this.formData.value)
        this.router.navigate(['/address/province'])
      }
    }
  }

  remove() {
    let index = this.appComponent.province.findIndex((objectEZ) => {
      return objectEZ.provinceId == this.formData.value.provinceId;
    })
    this.appComponent.province.splice(index, 1)
    this.router.navigate(['/address/province'])
  }


  //For Country
  sortCountryName(datas: any[]) {
    datas.sort((a, b) => a.countryName > b.countryName ? 1 : -1)
  }
  countryToDescription(province_countryId: string) {
    //หาตัวข้อมูล
    let country = this.appComponent.country.find((objectEZ) => {
      return objectEZ.countryId == province_countryId;
    })
    return country?.countryName;
  }

}
