import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-type-search',
  templateUrl: './type-search.component.html',
  styleUrls: ['./type-search.component.scss']
})
export class TypeSearchComponent implements OnInit {
  typesFrom: any[] = []
  typesTo: any[] = []
  typesList: any[] = []

  formCriteria: FormGroup

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder
  ) {
    this.formCriteria = this.fb.group({
      typeFrom: [null, [Validators.required]],
      typeTo: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.sortDatas(this.wharehouseComponent.productType)
    this.typesFrom = this.wharehouseComponent.productType
    this.typesTo = this.wharehouseComponent.productType
  }
  //=========================================================================================================

  search() {
    //กรณีกรอกถูกแล้ว
    if (this.formCriteria.valid) {
      this.typesList = this.wharehouseComponent.productType.filter((objectEZ) => {
        return objectEZ.productTypeId >= this.formCriteria.value.typeFrom
          && objectEZ.productTypeId <= this.formCriteria.value.typeTo
      })
    }
  }

  sortDatas(datas: any[]) {
    datas.sort((a, b) => a.productTypeId > b.productTypeId ? 1 : -1)
  }

  //กดเลือกแล้วไปเปลี่ยน typeTo 
  typeFromChange() {
    this.typesTo = this.wharehouseComponent.productType.filter((objectEZ) => {
      return objectEZ.productTypeId >= this.formCriteria.value.typeFrom
    })
  }
   //กดเลือกแล้วไปเปลี่ยน typeFrom
  typeToChange() {
    this.typesFrom = this.wharehouseComponent.productType.filter((objectEZ) => {
      return objectEZ.productTypeId <= this.formCriteria.value.typeTo
    })
  }

  clear() {
    this.formCriteria.reset();
    this.typesList = [];
  }

}
