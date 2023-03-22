import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubDistrictSB } from '../../request-get/request-get-object';

@Component({
  selector: 'app-sub-district-search',
  templateUrl: './sub-district-search.component.html',
  styleUrls: ['./sub-district-search.component.scss']
})
export class SubDistrictSearchComponent implements OnInit {
  sub_districtsList: SubDistrictSB[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //GET sub_district
    this.http.get<SubDistrictSB[]>('http://127.0.0.1:8080/sub_district').subscribe(response => {
      console.log(response)
      this.sub_districtsList = response;
    });
  }

  //================================================================================================================================
  filter(districtId: string) {
    console.log(districtId);

    //GET sub_district
    this.http.get<SubDistrictSB[]>('http://127.0.0.1:8080/sub_district/filter?districtId='+districtId).subscribe(response => {
      console.log(response)
      this.sub_districtsList = response;
    });
  }

  clear() {
    //GET sub_district
    this.http.get<SubDistrictSB[]>('http://127.0.0.1:8080/sub_district').subscribe(response => {
      console.log(response)
      this.sub_districtsList = response;
    });
  }

}
