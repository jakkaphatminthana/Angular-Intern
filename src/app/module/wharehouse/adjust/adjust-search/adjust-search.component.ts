import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-adjust-search',
  templateUrl: './adjust-search.component.html',
  styleUrls: ['./adjust-search.component.scss']
})
export class AdjustSearchComponent implements OnInit {
  adjustsFrom: any[] = []
  adjustsTo: any[] = []
  adjustsList: any[] = []

  formCriteria: FormGroup

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder
  ) {
    this.formCriteria = this.fb.group({
      adjustFrom: [null, [Validators.required]],
      adjustTo: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.sortDatas(this.wharehouseComponent.adjust)
    this.adjustsFrom = this.wharehouseComponent.adjust
    this.adjustsTo = this.wharehouseComponent.adjust
  }

  //=========================================================================================================
  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.adjustId > b.adjustId ? 1 : -1)
  }

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      this.adjustsList = this.wharehouseComponent.adjust.filter((objectEZ) => {
        return objectEZ.adjustId >= this.formCriteria.value.adjustFrom
          && objectEZ.adjustId <= this.formCriteria.value.adjustTo
      })
    }
  }

   //กดเลือกแล้วไปเปลี่ยน adjustTo 
   adjustFromChange() {
    this.adjustsTo = this.wharehouseComponent.adjust.filter((objectEZ) => {
      return objectEZ.adjustId >= this.formCriteria.value.adjustFrom
    })
  }
   //กดเลือกแล้วไปเปลี่ยน adjustFrom
   adjustToChange() {
    this.adjustsFrom = this.wharehouseComponent.adjust.filter((objectEZ) => {
      return objectEZ.adjustId <= this.formCriteria.value.adjustTo
    })
  }

  clear() {
    this.formCriteria.reset();
    this.adjustsList = [];
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
