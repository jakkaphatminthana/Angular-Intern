import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinceService } from '../service/province.service';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {

  provinceSelectionsFrom: any[] = [];
  provinceSelectionsTo: any[] = [];
  formgroupCriteria: FormGroup;

  pagingDataElement: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageNumber: number = 0;
  pageSize: number = 5;
  pageData: any[] = [];

  constructor(
    private service: ProvinceService,
    private fb: FormBuilder
  ) {
    this.formgroupCriteria = this.fb.group({
      provinceFrom: [null],
      provinceTo: [null],
    });
  }

  ngOnInit(): void {
    this.searchSelectionProvinceFrom();
    this.searchSelectionProvinceTo();
  }

  public searchSelectionProvinceFrom() {
    this.service.lt(this.formgroupCriteria.value.provinceTo).subscribe((data: any[]) => {
      console.log(data);
      this.provinceSelectionsFrom = data;
    })
  }

  public searchSelectionProvinceTo() {
    this.service.gt(this.formgroupCriteria.value.provinceFrom).subscribe((data: any[]) => {
      console.log(data);
      this.provinceSelectionsTo = data;
    })
  }

  public reset() {
    this.formgroupCriteria.reset();
    this.searchSelectionProvinceFrom();
    this.searchSelectionProvinceTo(); 
  }

  public onSearch() {
    if (this.formgroupCriteria.valid) {
      this.service.pageable(
        this.pageNumber, this.pageSize,
        'provinceId', 'asc',
        this.formgroupCriteria.value.provinceFrom,
        this.formgroupCriteria.value.provinceTo,
      ).subscribe((respon: any) => {
        this.pageData = respon.content;
        this.totalPages = respon.totalPages;
        this.totalElements = respon.totalElements;
        this.pagingDataElement = new Array(this.totalPages);
      });
    }
  }

  public goToPage(pageIndex: number) {
    this.pageNumber = pageIndex;
    this.onSearch();
  }

  
}
