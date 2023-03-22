import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../../district/service/district.service';
import { ProvinceService } from '../../province/service/province.service';
import { SubdistrictService } from '../service/subdistrict.service';

@Component({
  selector: 'app-subdistrict-list',
  templateUrl: './subdistrict-list.component.html',
  styleUrls: ['./subdistrict-list.component.scss']
})
export class SubdistrictListComponent implements OnInit {

  provinceSelections: any[] = [];
  districtSelections: any[] = [];
  subdistrictSelectionsFrom: any[] = [];
  subdistrictSelectionsTo: any[] = [];
  formgroupCriteria: FormGroup;

  constructor(
    private service: SubdistrictService,
    private serviceDistrict: DistrictService,
    private serviceProvince: ProvinceService,
    private fb: FormBuilder
  ) {
    this.formgroupCriteria = this.fb.group({
      province: [null],
      district: [null],
      subdistrictFrom: [null],
      subdistrictTo: [null],
    });
  }

  ngOnInit(): void {
    this.searchSelectionProvince();
    this.searchSelectionDistrict();
    this.searchSelectionSubDistrictFrom();
    this.searchSelectionSubDistrictTo();
  }

  //Selection data
  public searchSelectionProvince() {
    this.serviceProvince.all().subscribe((data: any[]) => {
      console.log(data);
      this.provinceSelections = data;
    })
  }

  public searchSelectionDistrict() {
    this.serviceDistrict.all().subscribe((data: any[]) => {
      console.log(data);
      this.districtSelections = data;
    })
  }

  public searchSelectionSubDistrictFrom() {
    this.service.lt(this.formgroupCriteria.value.subdistrictTo).subscribe((data: any[]) => {
      console.log(data);
      this.subdistrictSelectionsFrom = data;
    })
  }

  public searchSelectionSubDistrictTo() {
    this.service.gt(this.formgroupCriteria.value.subdistrictFrom).subscribe((data: any[]) => {
      console.log(data);
      this.subdistrictSelectionsTo = data;
    })
  }

  public reset() {
    this.formgroupCriteria.reset();
  }

}
