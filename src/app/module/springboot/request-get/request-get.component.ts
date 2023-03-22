import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DistrictSB, ProvinceSB, SubDistrictSB } from './request-get-object';

@Component({
  selector: 'app-request-get',
  templateUrl: './request-get.component.html',
  styleUrls: ['./request-get.component.scss'],
})
export class RequestGetComponent implements OnInit {
  provinceList: ProvinceSB[] = [];
  districtList: DistrictSB[] = [];
  sub_districtList: SubDistrictSB[] = [];

  termPro!: string | null;
  termDis!: string | null;
  termSub!: string | null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get('https://www.anapioficeandfire.com/api/books').subscribe(response => {
    //   console.log('response: '+ response)
    // });

    //GET province 
    this.http.get<ProvinceSB[]>('http://127.0.0.1:8080/province/search').subscribe(response => {
      console.log(response)
      this.provinceList = response;
    });
    //GET district
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district/search').subscribe(response => {
      console.log(response)
      this.districtList = response;
    });
    //GET sub_district
    this.http.get<SubDistrictSB[]>('http://127.0.0.1:8080/subdistrict/search').subscribe(response => {
      console.log(response)
      this.sub_districtList = response;
    });
  }

  filterDisByPro(provinceID: string) {
    //GET province 
    this.http.get<DistrictSB[]>('http://127.0.0.1:8080/district?provinceId=' + Number(provinceID)).subscribe(response => {
      console.log(response)
      this.districtList = response;
    });
  }

}
