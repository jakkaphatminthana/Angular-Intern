import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DistrictSB } from 'src/app/module/springboot/request-get/request-get-object';

@Component({
  selector: 'app-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.scss']
})
export class DistrictFormComponent implements OnInit {

  formData: FormGroup;
  districtId!: number | string | null; //เอาไว้ใช้ปิดการแก้ไขตอน update
  districtData: DistrictSB[] = [];

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
    })
  }

  ngOnInit(): void {
    //Update Mode
    this.districtId = this.activatedRoute.snapshot.paramMap.get('districtId');
    console.log("districtId = " + this.districtId);

    // GET district 
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district/search').subscribe(response => {
      this.districtData = response;

      // If the districtId is present, find the corresponding districtI and populate the form
      if (this.districtId) {
        // Find the district in the districtData array
        let district = this.districtData.find(p => p.districtId == this.districtId);

        if (district) {
          // Populate the form with the district values
          this.formData.patchValue(district);
        } else {
          // If the district is not found, redirect to the district list page
          this.router.navigate(['/master/district']);
        }
      }
    });
  }
  //====================================================================================================================================
  save(districtEZ: { districtId: string, districtName: string }) {

    const newDistrict: DistrictSB = {
      districtId: +districtEZ.districtId,
      districtName: districtEZ.districtName,
      active: true,
      province: {
        provinceId: 1,
        provinceName: "กรุงเทพมหานคร",
        active: true
      }
    };

    console.log("save.districtId : " + newDistrict.districtId);
    console.log("save.districtName : " + newDistrict.districtName);

    if (districtEZ.districtId) {
      this.http.post("http://127.0.0.1:8080/district/save", newDistrict).subscribe(respone => {
        this.toastr.success('update DistrictId(' + newDistrict.districtId + ') successfully', 'Update Success');
        this.router.navigate(['/master/district']);
      })

    } else {
      this.http.post("http://127.0.0.1:8080/district/save", newDistrict).subscribe(respone => {
        this.toastr.success('District created successfully', 'Create Success');
        this.router.navigate(['/master/district']);
      }, error => {
        this.toastr.error(error.message, 'Error');
      })
    }
  }

  remove() {
    if (confirm('Are you sure to delete this record?')) {
      this.http.delete("http://127.0.0.1:8080/district/delete/" + this.districtId).subscribe(response => {
        this.toastr.success('DistrictId(' + this.districtId + ') deleted successfully', 'Delete Success');
        this.router.navigate(['/master/district']);
      },
      );
    }
  }

}
