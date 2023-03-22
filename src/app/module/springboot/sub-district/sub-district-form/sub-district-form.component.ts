import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DistrictSB, SubDistrictSB } from '../../request-get/request-get-object';

@Component({
  selector: 'app-sub-district-form',
  templateUrl: './sub-district-form.component.html',
  styleUrls: ['./sub-district-form.component.scss']
})
export class SubDistrictFormComponent implements OnInit {
  formData: FormGroup;
  sub_districtId: string | null = null; //เอาไว้ใช้ปิดการแก้ไขตอน update
  serviceData: SubDistrictSB[] = [];
  districtData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
    private http: HttpClient, //call service
  ) {
    //Form Role
    this.formData = this.fb.group({
      subDis_id: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      zipcode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      subDis_nameTh: [null, [Validators.required, Validators.maxLength(100)]],
      subDis_nameEn: [null, [Validators.required, Validators.maxLength(100)]],
      districtId: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    //GET district
    this.http.get<SubDistrictSB[]>('http://127.0.0.1:8080/sub_district').subscribe(response => {
      console.log(response)
      this.serviceData = response;
    });

    //GET district
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district').subscribe(response => {
      console.log(response)
      this.districtData = response;
    });
    this.sortDistrictName(this.districtData);
  }

  //====================================================================================================================================
  save(sub_districtEZ: {
    subDis_id: number,
    zipcode: number,
    subDis_nameTh: string,
    subDis_nameEn: string,
    districtId: number,
  }) {
    if (this.formData.valid) {
      let index = this.serviceData.findIndex((objectEZ) => {
        return objectEZ.subdistrictId == this.formData.value.sub_districtId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.sub_districtId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        // this.provinceData[index] = this.formData.value
        this.router.navigate(['/springboot/sub-district'])
        //Create
      } else {
        this.createSubDistrict(sub_districtEZ);
        this.router.navigate(['/springboot/sub-district']).then(() => {
          window.location.reload;
        })
      }
    }
  }

  //TODO : POST SubDistrict
  createSubDistrict(sub_districtEZ: {
    subDis_id: number,
    zipcode: number,
    subDis_nameTh: string,
    subDis_nameEn: string,
    districtId: number,
  }) {
    this.http.post('http://127.0.0.1:8080/sub_district', sub_districtEZ).toPromise().then(data => {
      console.log(data);
    });
  }

  remove() {

  }

  //------------------------------------------------------------------------------------------------------------
  //For District
  sortDistrictName(datas: any[]) {
    datas.sort((a, b) => a.districtName > b.districtName ? 1 : -1)
  }

  districtToDescription(dataId: string) {
    //หาตัวข้อมูล
    let district = this.districtData.find((objectEZ) => {
      return objectEZ.districtId == dataId;
    })
    return district?.districtName;
  }

}
