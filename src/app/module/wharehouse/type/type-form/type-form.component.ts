import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {

  formData: FormGroup;
  productTypeId: string | null = null;

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      productTypeId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      productTypeName: [null, [Validators.required, Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {
    this.productTypeId = this.activatedRoute.snapshot.paramMap.get('productTypeId')
    if (this.productTypeId) {
      //หาตัวข้อมูล
      let productType = this.wharehouseComponent.productType.find((objectEZ) => {
        return objectEZ.productTypeId == this.productTypeId
      })

      if (productType) {
        this.formData.patchValue(productType)
      } else {
        this.router.navigate(['wharehouse/type'])
      }
    }
  }

  save() {
    if (this.formData.valid) {
      let index = this.wharehouseComponent.productType.findIndex((objectEZ) => {
        return objectEZ.productTypeId == this.formData.value.productTypeId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.productTypeId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.wharehouseComponent.productType[index] = this.formData.value
        this.router.navigate(['/wharehouse/type'])
        //Create
      } else {
        this.wharehouseComponent.productType.push(this.formData.value)
        this.router.navigate(['/wharehouse/type'])
      }
    }
  }

  remove() {
    let index = this.wharehouseComponent.productType.findIndex((objectEZ) => {
      return objectEZ.productTypeId == this.formData.value.productTypeId;
    })
    this.wharehouseComponent.productType.splice(index, 1)
    this.router.navigate(['/wharehouse/type'])
  }
}
