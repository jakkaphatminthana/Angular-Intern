import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../../district/service/district.service';
import { ProvinceService } from '../../province/service/province.service';
import { SubdistrictService } from '../../subdistrict/service/subdistrict.service';
import { PostcodeService } from '../service/postcode.service';

@Component({
  selector: 'app-postcode-list',
  templateUrl: './postcode-list.component.html',
  styleUrls: ['./postcode-list.component.scss']
})
export class PostcodeListComponent implements OnInit {
  provinceSelections: any[] = [];
  districtSelections: any[] = [];
  subdistrictSelections: any[] = [];
  postcodeSelectionsFrom: any[] = [];
  postcodeSelectionsTo: any[] = [];
  formgroupCriteria: FormGroup;

  constructor(
    private service: PostcodeService,
    private serviceProvince: ProvinceService,
    private serviceDistrict: DistrictService,
    private serviceSubDistrict: SubdistrictService,
    private fb: FormBuilder
  ) {
    this.formgroupCriteria = this.fb.group({
      province: [null],
      district: [null],
      subdistrict: [null],
      postcodeFrom: [null],
      postcodeTo: [null],
    });
  }

  ngOnInit(): void {
    this.searchSelectionProvince();
    this.searchSelectionDistrict();
    this.searchSelectionSubDistrict();
    this.searchSelectionPostcodeFrom();
    this.searchSelectionPostcodeTo();
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

  public searchSelectionSubDistrict() {
    this.serviceSubDistrict.all().subscribe((data: any[]) => {
      console.log(data);
      this.subdistrictSelections = data;
    })
  }

  public searchSelectionPostcodeFrom() {
    this.service.lt(this.formgroupCriteria.value.postcodeTo).subscribe((data: any[]) => {
      console.log(data);
      this.postcodeSelectionsFrom = data;
    })
  }

  public searchSelectionPostcodeTo() {
    this.service.gt(this.formgroupCriteria.value.postcodeFrom).subscribe((data: any[]) => {
      console.log(data);
      this.postcodeSelectionsTo = data;
    })
  }

  public reset() {
    this.formgroupCriteria.reset();
  }

}
