import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WharehouseComponent } from '../../wharehouse.component';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {

  formData: FormGroup;
  storeId: string | null = null;

  constructor(
    private wharehouseComponent: WharehouseComponent,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,  //ช่วยให้รับค่าจากหน้าอื่น
    private toastr: ToastrService,  //pop-up message
  ) {
    this.formData = this.fb.group({
      storeId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      storeName: [null, [Validators.required, Validators.maxLength(100)]],
      storeDescription:[null, [Validators.required]],
      storeAddress: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.storeId = this.activatedRoute.snapshot.paramMap.get('storeId')
    if (this.storeId) {
      //หาตัวข้อมูล
      let store = this.wharehouseComponent.store.find((objectEZ) => {
        return objectEZ.storeId == this.storeId
      })

      if (store) {
        this.formData.patchValue(store)
      } else {
        this.router.navigate(['wharehouse/store'])
      }
    }
  }

  save() {
    if (this.formData.valid) {
      let index = this.wharehouseComponent.store.findIndex((objectEZ) => {
        return objectEZ.storeId == this.formData.value.storeId;
      })
      //ป้องกันการเพิ่มข้อมูล ซ้ำกัน
      if (this.storeId == null && index >= 0) {
        this.toastr.error("ข้อมูลซ้ำ")
        //Update
      } else if (index >= 0) {
        this.wharehouseComponent.store[index] = this.formData.value
        this.router.navigate(['/wharehouse/store'])
        //Create
      } else {
        this.wharehouseComponent.store.push(this.formData.value)
        this.router.navigate(['/wharehouse/store'])
      }
    }
  }

  remove() {
    let index = this.wharehouseComponent.store.findIndex((objectEZ) => {
      return objectEZ.storeId == this.formData.value.storeId;
    })
    this.wharehouseComponent.store.splice(index, 1)
    this.router.navigate(['/wharehouse/store'])
  }

}
