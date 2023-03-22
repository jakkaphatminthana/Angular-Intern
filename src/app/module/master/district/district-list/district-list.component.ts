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

  provinceSelections: any[] = [];
  districtSelectionsFrom: any[] = [];
  districtSelectionsTo: any[] = [];
  formgroupCriteria: FormGroup;

  constructor(
    private service: DistrictService,
    private serviceProvince: ProvinceService, 
    private fb: FormBuilder
  ) {
    this.formgroupCriteria = this.fb.group({
      provinces: [null],
      districtFrom: [null],
      districtTo: [null],
    });
  }

  ngOnInit(): void {
    this.searchSelectionProvince();
    this.searchSelectionDistrictFrom();
    this.searchSelectionDistrictTo();
  }

  public searchSelectionProvince() {
    this.serviceProvince.all().subscribe((data: any[]) => {
      console.log(data);
      this.provinceSelections = data;
    })
  }

  public searchSelectionDistrictFrom() {
    this.service.lt(this.formgroupCriteria.value.districtTo).subscribe((data: any[]) => {
      console.log(data);
      this.districtSelectionsFrom = data;
    })
  }

  public searchSelectionDistrictTo() {
    this.service.gt(this.formgroupCriteria.value.districtFrom).subscribe((data: any[]) => {
      console.log(data);
      this.districtSelectionsTo = data;
    })
  }

  public reset() {
    this.formgroupCriteria.reset();
  }

}
