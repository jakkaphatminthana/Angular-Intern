import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProvinceService } from '../../province/service/province.service';
import { DistrictService } from '../service/district.service';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {

  formgroupCriteria: FormGroup;
  provinceSelections: any[] = [];
  districtSelectionsFrom: any[] = [];
  districtSelectionsTo: any[] = [];

  pagingDataElement: any[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  pageNumber: number = 0;
  pageSize: number = 5;
  pageData: any[] = [];

  constructor(
    private service: DistrictService,
    private serviceProvince: ProvinceService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.formgroupCriteria = this.fb.group({
      provinces: [null],
      districtFrom: [null],
      districtTo: [null],
    });
  }

  ngOnInit(): void {
    this.loadProvinceSelections();
  }

  private loadDistrictSelections(provinceId: number) {
    this.service.findByProvinceId(provinceId).subscribe(data => {
      this.districtSelectionsFrom = data;
      this.districtSelectionsTo = data;
    });
  }

  private loadProvinceSelections() {
    this.serviceProvince.all().subscribe(data => {
      this.provinceSelections = data;
    });
  }

  public searchSelectionProvince() {
    const districtFromControl = (this.formgroupCriteria as FormGroup).get('districtFrom');

    if (this.formgroupCriteria && this.formgroupCriteria.value.provinces) {
      const provinceId = this.formgroupCriteria.value.provinces;

      // Load the districts for the selected province
      this.loadDistrictSelections(provinceId);

      // Set the district selection options to have the same provinceId
      this.formgroupCriteria.get('districtFrom')?.setValue(null);
      this.formgroupCriteria.get('districtTo')?.setValue(null);
      this.formgroupCriteria.get('districtFrom')?.enable();
      this.formgroupCriteria.get('districtTo')?.enable();
    } else {
      // Clear the district selections if no province is selected
      this.districtSelectionsFrom = [];
      this.districtSelectionsTo = [];
      this.formgroupCriteria?.get('districtFrom')?.disable();
      this.formgroupCriteria?.get('districtTo')?.disable();
    }
  }

  public searchSelectionDistrictFrom() { }
  public searchSelectionDistrictTo() { }

  public reset() {
    this.formgroupCriteria.reset();
    this.searchSelectionDistrictFrom();
    this.searchSelectionDistrictTo();
  }

  public onSearch() {
    if (this.formgroupCriteria.valid) {
      this.service.pageable(
        this.pageNumber, this.pageSize,
        'districtId', 'asc',
        this.formgroupCriteria.value.districtFrom,
        this.formgroupCriteria.value.districtTo,
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