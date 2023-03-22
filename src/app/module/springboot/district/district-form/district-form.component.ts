import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DistrictSB, ProvinceSB } from '../../request-get/request-get-object';

@Component({
  selector: 'app-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.scss']
})
export class DistrictFormComponent implements OnInit {
  formData: FormGroup;
  districtId: string | null = null; //เอาไว้ใช้ปิดการแก้ไขตอน update
  serviceData: DistrictSB[] = [];
  provinceData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
    private http: HttpClient, //call service
  ) {
    //Form Role
    this.formData = this.fb.group({
      districtId: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      districtName: [null, [Validators.required, Validators.maxLength(100)]],
      provinceId: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    //GET district
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district').subscribe(response => {
      console.log(response)
      this.serviceData = response;
    });

    //GET province
    this.http.get<ProvinceSB[]>('http://127.0.0.1:8080/province').subscribe(response => {
      console.log(response)
      this.provinceData = response;
    });
    this.sortProvinceName(this.provinceData);
  }
  //====================================================================================================================================

  save(districtEZ: { districtId: string, districtName: string, provinceId: string }) {
    if (this.formData.valid) {
      let index = this.serviceData.findIndex((objectEZ) => {
        return objectEZ.districtId == this.formData.value.districtId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.districtId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        // this.provinceData[index] = this.formData.value
        this.router.navigate(['/springboot/district'])
        //Create
      } else {
        this.createDistrict(districtEZ)
        this.router.navigate(['/springboot/district']).then(() => {
          window.location.reload;
        })
      }
    }
  }

  //TODO : POST District
  createDistrict(districtEZ: { districtId: string, districtName: string, provinceId: string}) {
    this.http.post('http://127.0.0.1:8080/district', districtEZ).toPromise().then(data => {
      console.log(data);
    });
  }

  remove() {

  }

  //------------------------------------------------------------------------------------------------------------
  //For Province
  sortProvinceName(datas: any[]) {
    datas.sort((a, b) => a.provinceName > b.provinceName ? 1 : -1)
  }
  provinceToDescription(dataId: string) {
    //หาตัวข้อมูล
    let province = this.provinceData.find((objectEZ) => {
      return objectEZ.provinceId == dataId;
    })
    return province?.provinceName;
  }
}
