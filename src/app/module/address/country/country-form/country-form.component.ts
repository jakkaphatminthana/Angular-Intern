import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  formData: FormGroup;
  countryId: string | null = null;

  constructor(
    private appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      countryId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      countryName: [null, [Validators.required, Validators.maxLength(100)]],
    })
   }

  ngOnInit(): void {
    this.countryId = this.activatedRoute.snapshot.paramMap.get('countryId')
    if (this.countryId) {
      //หาตัวข้อมูล
      let country = this.appComponent.country.find((objectEZ) => {
        return objectEZ.countryId == this.countryId
      })

      if (country) {
        this.formData.patchValue(country)
      } else {
        this.router.navigate(['address/country'])
      }
    }
  }

  save() {
    if (this.formData.valid) {
      let index = this.appComponent.country.findIndex((objectEZ) => {
        return objectEZ.countryId == this.formData.value.countryId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.countryId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.appComponent.country[index] = this.formData.value
        this.router.navigate(['/address/country'])
        //Create
      } else {
        this.appComponent.country.push(this.formData.value)
        this.router.navigate(['/address/country'])
      }
    }
  }

  remove() {
    let index = this.appComponent.country.findIndex((objectEZ) => {
      return objectEZ.countryId == this.formData.value.countryId;
    })
    this.appComponent.country.splice(index, 1)
    this.router.navigate(['/address/country'])
  }

}
