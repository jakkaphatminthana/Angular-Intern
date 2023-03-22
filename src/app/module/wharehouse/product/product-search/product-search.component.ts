import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  productsFrom: any[] = []
  productsTo: any[] = []
  productsList: any[] = []

  formCriteria: FormGroup

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder
  ) {
    this.formCriteria = this.fb.group({
      productFrom: [null, [Validators.required]],
      productTo: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.sortDatas(this.wharehouseComponent.product)
    this.productsFrom = this.wharehouseComponent.product
    this.productsTo = this.wharehouseComponent.product

  }
  //=========================================================================================================

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      this.productsList = this.wharehouseComponent.product.filter((objectEZ) => {
        return objectEZ.barcode >= this.formCriteria.value.productFrom
          && objectEZ.barcode <= this.formCriteria.value.productTo
      })
    }
  }

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.barcode > b.barcode ? 1 : -1)
  }

  //กดเลือกแล้วไปเปลี่ยน ProductTo 
  productFromChange() {
    this.productsTo = this.wharehouseComponent.product.filter((objectEZ) => {
      return objectEZ.barcode >= this.formCriteria.value.productFrom
    })
  }
   //กดเลือกแล้วไปเปลี่ยน ProductFrom
  productToChange() {
    this.productsFrom = this.wharehouseComponent.product.filter((objectEZ) => {
      return objectEZ.barcode <= this.formCriteria.value.productTo
    })
  }

  clear() {
    this.formCriteria.reset();
    this.productsList = [];
  }

  typeToDescription(typeId:string) {
    //หาตัวข้อมูล
    let type = this.wharehouseComponent.productType.find((objectEZ) => {
      return objectEZ.productTypeId == typeId;
    })
    return type?.productTypeName;
  }

}
