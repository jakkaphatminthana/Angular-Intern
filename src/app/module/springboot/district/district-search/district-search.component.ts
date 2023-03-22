import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DistrictSB } from '../../request-get/request-get-object';

@Component({
  selector: 'app-district-search',
  templateUrl: './district-search.component.html',
  styleUrls: ['./district-search.component.scss']
})
export class DistrictSearchComponent implements OnInit {
  districtsList: DistrictSB[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    //GET district
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district/search').subscribe(response => {
      console.log(response)
      this.districtsList = response;
    });
  }

  //================================================================================================================================
  filter(provinceId: string) {
    console.log(provinceId);

    //GET district filter
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district/filter?provinceId=' + Number(provinceId)).subscribe(response => {
      console.log(response)
      this.districtsList = response;
    });
  }

  clear() {
    //GET district
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district').subscribe(response => {
      console.log(response)
      this.districtsList = response;
    });
  }

}
