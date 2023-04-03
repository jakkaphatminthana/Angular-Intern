import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProvinceSB } from 'src/app/module/springboot/request-get/request-get-object';

@Component({
  selector: 'app-province-form',
  templateUrl: './province-form.component.html',
  styleUrls: ['./province-form.component.scss']
})
export class ProvinceFormComponent implements OnInit {

  formData: FormGroup;
  provinceId!: number | string | null; //เอาไว้ใช้ปิดการแก้ไขตอน update
  provinceData: ProvinceSB[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
    private http: HttpClient, //call service
  ) {
    //Form Role
    this.formData = this.fb.group({
      provinceId: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      provinceName: [null, [Validators.required, Validators.maxLength(100)]],
    })
  }

  ngOnInit(): void {
    //Update Mode
    this.provinceId = this.activatedRoute.snapshot.paramMap.get('provinceId');
    console.log("provinceId = " + this.provinceId);

    // GET province 
    this.http.get<ProvinceSB[]>('http://127.0.0.1:8080/province/search').subscribe(response => {
      this.provinceData = response;

      // If the provinceId is present, find the corresponding province and populate the form
      if (this.provinceId) {
        // Find the province in the provinceData array
        let province = this.provinceData.find(p => p.provinceId == this.provinceId);

        if (province) {
          // Populate the form with the province values
          this.formData.patchValue(province);
        } else {
          // If the province is not found, redirect to the provinces list page
          this.router.navigate(['/master/province']);
        }
      }
    });
  }
  //====================================================================================================================================
  save(provinceEZ: { provinceId: string, provinceName: string }) {

    const newProvince: ProvinceSB = {
      provinceId: +provinceEZ.provinceId,
      provinceName: provinceEZ.provinceName,
      active: true,
    };

    console.log("save.provinceId : " + newProvince.provinceId);
    console.log("save.provinceName : " + newProvince.provinceName);

    if (provinceEZ.provinceId) {
      this.http.post("http://127.0.0.1:8080/province/save", newProvince).subscribe(respone => {
        this.toastr.success('update ProvinceId(' + newProvince.provinceId + ') successfully', 'Update Success');
        this.router.navigate(['/master/province']);
      })

    } else {
      this.http.post("http://127.0.0.1:8080/province/save", newProvince).subscribe(respone => {
        this.toastr.success('Province created successfully', 'Create Success');
        this.router.navigate(['/master/province']);
      }, error => {
        this.toastr.error(error.message, 'Error');
      })
    }
  }

  remove() {
    if (confirm('Are you sure to delete this record?')) {
      this.http.delete("http://127.0.0.1:8080/province/delete/" + this.provinceId).subscribe(response => {
        this.toastr.success('ProvinceId(' + this.provinceId + ') deleted successfully', 'Delete Success');
        this.router.navigate(['/master/province']);
      },
      );
    }
  }


  // save(provinceEZ: { provinceId: string, provinceName: string }) {
  //   if (this.formData.valid) {
  //     let index = this.provinceData.findIndex((objectEZ) => {
  //       return objectEZ.provinceId == this.formData.value.provinceId;
  //     })
  //     //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
  //     if (this.provinceId == null && index >= 0) {
  //       this.toastr.error("ข้อมูลซ้ำ")
  //       //Update
  //     } else if (index >= 0) {
  //       console.log("update")
  //       this.update(this.formData.value)
  //       this.router.navigate(['/springboot/province']).then(() => {
  //         location.reload();
  //       });
  //       //Create
  //     } else {
  //       console.log("create")
  //       this.createProvince(provinceEZ)
  //       this.router.navigate(['/springboot/province']).then(() => {
  //         location.reload();
  //       });
  //     }
  //   }
  // }

  // //TODO : POST Service
  // createProvince(provinceEZ: { provinceId: string, provinceName: string }) {
  //   this.http.post('http://127.0.0.1:8080/province/create', provinceEZ).toPromise().then(response => {
  //     // Handle the response from the server
  //     console.log(response)
  //   }
  //   );
  // }

  // //TODO : PUT Service
  // update(province: { provinceId: string, provinceName: string }) {
  //   this.http.put('http://127.0.0.1:8080/province/update/' + province.provinceId, province)
  //     .subscribe(response => {
  //       // Handle the response from the server
  //       console.log(response)
  //     });
  // }

  // remove() {
  //   let index = this.provinceData.findIndex((objectEZ) => {
  //     return objectEZ.provinceId == this.formData.value.provinceId;
  //   })

  //   console.log('delete')
  //   this.http.delete(`http://127.0.0.1:8080/${index}`).subscribe(response => {
  //     // Handle the response from the API, for example by showing a success message
  //     console.log(response)
  //   });
  //   this.router.navigate(['/springboot/province'])
  // }

}
