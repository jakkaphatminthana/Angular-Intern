import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formData: FormGroup;
  barcode: string | null = null;
  productTypeData: any[] = [];

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      barcode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      productName: [null, [Validators.required, Validators.maxLength(100)]],
      productTypeId: [null, [Validators.required]],
      productDescription: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    //For productType
    this.productTypeData = this.wharehouseComponent.productType
    this.sortTypeId(this.wharehouseComponent.productType)

    //For product
    this.barcode = this.activatedRoute.snapshot.paramMap.get('barcode')
    if (this.barcode) {
      //จับคู่ข้อมูล, หาข้อมูล
      let barcode = this.wharehouseComponent.product.find((objectEZ) => {
        return objectEZ.barcode == this.barcode
      })

      if (barcode) {
        this.formData.patchValue(barcode)
      } else {
        this.router.navigate(['wharehouse/product'])
      }
    }
  }

  save() {
    if (this.formData.valid) {
      let index = this.wharehouseComponent.product.findIndex((objectEZ) => {
        return objectEZ.barcode == this.formData.value.barcode;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.barcode == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.wharehouseComponent.product[index] = this.formData.value
        this.router.navigate(['/wharehouse/product'])
        //Create
      } else {
        this.wharehouseComponent.product.push(this.formData.value)
        this.router.navigate(['/wharehouse/product'])
      }
    }
  }

  remove() {
    let index = this.wharehouseComponent.product.findIndex((objectEZ) => {
      return objectEZ.barcode == this.formData.value.barcode;
    })
    this.wharehouseComponent.product.splice(index, 1)
    this.router.navigate(['/wharehouse/product'])
  }

  typeToDescription(typeId: string) {
    //หาตัวข้อมูล
    let type = this.wharehouseComponent.productType.find((objectEZ) => {
      return objectEZ.productTypeId == typeId;
    })
    return type?.productTypeName;
  }

  sortTypeId(datas: any[]) {
    datas.sort((a, b) => a.productTypeId > b.productTypeId ? 1 : -1)
  }

}
