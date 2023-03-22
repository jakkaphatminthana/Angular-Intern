import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-adjust-form',
  templateUrl: './adjust-form.component.html',
  styleUrls: ['./adjust-form.component.scss']
})
export class AdjustFormComponent implements OnInit {

  formData: FormGroup;
  adjustId: string | null = null;
  
  productData: any[] = [];
  storeData: any[] = [];

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      adjustId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      barcode: [null, [Validators.required]],
      storeId:[null, [Validators.required]],
      amount: [null, [Validators.required,Validators.min(1)]],
      instock: [null, [Validators.required]],
    })
   }

  ngOnInit(): void {
    //For product
    this.productData = this.wharehouseComponent.product
    this.sortProductData(this.wharehouseComponent.product)
    //For store
    this.storeData = this.wharehouseComponent.store
    this.sortStoreData(this.wharehouseComponent.store)

    //For adjust
    this.adjustId = this.activatedRoute.snapshot.paramMap.get('adjustId')
    if (this.adjustId) {
      //หาตัวข้อมูล
      let adjust = this.wharehouseComponent.adjust.find((objectEZ) => {
        return objectEZ.adjustId == this.adjustId
      })

      if (adjust) {
        this.formData.patchValue(adjust)
      } else {
        this.router.navigate(['wharehouse/adjust'])
      }
    }
  }

  //=======================================================================================================
  save() {
    if (this.formData.valid) {
      let index = this.wharehouseComponent.adjust.findIndex((objectEZ) => {
        return objectEZ.adjustId == this.formData.value.adjustId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.adjustId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.wharehouseComponent.adjust[index] = this.formData.value
        this.router.navigate(['/wharehouse/adjust'])
        //Create
      } else {
        this.wharehouseComponent.adjust.push(this.formData.value)
        this.router.navigate(['/wharehouse/adjust'])
      }
    }
  }

  remove() {
    let index = this.wharehouseComponent.adjust.findIndex((objectEZ) => {
      return objectEZ.adjustId == this.formData.value.adjustId;
    })
    this.wharehouseComponent.adjust.splice(index, 1)
    this.router.navigate(['/wharehouse/adjust'])
  }

  sortProductData(datas: any[]) {
    datas.sort((a, b) => a.productId > b.productId ? 1 : -1)
  }
  sortStoreData(datas: any[]) {
    datas.sort((a, b) => a.storeId > b.storeId ? 1 : -1)
  }

  barcodeToProductName(barcodeId:string) {
    //หาตัวข้อมูล
    let product = this.wharehouseComponent.product.find((objectEZ) => {
      return objectEZ.barcode == barcodeId;
    })
    return product?.productName;
  }

  storeIdToStoreName(storeId:string) {
    //หาตัวข้อมูล
    let storeEZ = this.wharehouseComponent.store.find((objectEZ) => {
      return objectEZ.storeId == storeId;
    })
    return storeEZ?.storeName;
  }


}
