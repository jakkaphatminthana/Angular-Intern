import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.scss']
})
export class StoreSearchComponent implements OnInit {
  storesFrom: any[] = []
  storesTo: any[] = []
  storesList: any[] = []

  formCriteria: FormGroup

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder
  ) { 
    this.formCriteria = this.fb.group({
      storeFrom: [null, [Validators.required]],
      storeTo: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.sortDatas(this.wharehouseComponent.store)
    this.storesFrom = this.wharehouseComponent.store
    this.storesTo = this.wharehouseComponent.store
  }

  //=========================================================================================================

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      this.storesList = this.wharehouseComponent.store.filter((objectEZ) => {
        return objectEZ.storeId >= this.formCriteria.value.storeFrom
          && objectEZ.storeId <= this.formCriteria.value.storeTo
      })
    }
  }

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.storeId > b.storeId ? 1 : -1)
  }

   //กดเลือกแล้วไปเปลี่ยน storeTo 
   storeFromChange() {
    this.storesTo = this.wharehouseComponent.store.filter((objectEZ) => {
      return objectEZ.storeId >= this.formCriteria.value.storeFrom
    })
  }
   //กดเลือกแล้วไปเปลี่ยน storeFrom
   storeToChange() {
    this.storesFrom = this.wharehouseComponent.store.filter((objectEZ) => {
      return objectEZ.storeId <= this.formCriteria.value.storeTo
    })
  }

  clear() {
    this.formCriteria.reset();
    this.storesList = [];
  }

}
