import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trainee.web';

  //ตัวอย่างการ route
  // constructor(private route:Router) {}
  // gotoWhareHouse() {
  //   this.route.navigate(['/wharehouse/store']);
  // }

  //Address: =============================================================================================================================
  country: any[] = [
    {
      countryId: "C001",
      countryName: "Thailand"
    },
    {
      countryId: "C002",
      countryName: "Japan"
    },
    {
      countryId: "C003",
      countryName: "Spain"
    },
  ];
  province: any[] = [
    {
      provinceId: "P001",
      provinceName: "เชียงราย",
      countryId: "C001"
    },
    {
      provinceId: "P002",
      provinceName: "เชียงใหม่",
      countryId: "C001"
    },
    {
      provinceId: "P003",
      provinceName: "Tokyo",
      countryId: "C002"
    },
  ];
  district: any[] = [
    {
      districtId: "D001",
      districtName: "เมืองเชียงราย",
      provinceId: "P001",
      countryId: "C001"
    },
    {
      districtId: "D0011",
      districtName: "เมืองเชียงราย2",
      provinceId: "P001",
      countryId: "C001"
    },
    {
      districtId: "D002",
      districtName: "เมืองเชียงใหม่",
      provinceId: "P002",
      countryId: "C001"
    },
    {
      districtId: "D003",
      districtName: "Tsukiji",
      provinceId: "P003",
      countryId: "C002"
    },
  ];
  sub_district: any[] = [
    {
      sub_districtId: "SD001",
      sub_districtName: "ท่าสุด",
      districtId: "D001",
      provinceId: "P001",
      countryId: "C001",
    },
    {
      sub_districtId: "SD0011",
      sub_districtName: "ท่าสุด2",
      districtId: "D001",
      provinceId: "P001",
      countryId: "C001",
    },
    {
      sub_districtId: "SD002",
      sub_districtName: "ศรีภูมิ",
      districtId: "D002",
      provinceId: "P002",
      countryId: "C001",
    },
    {
      sub_districtId: "SD003",
      sub_districtName: "ABC",
      districtId: "D003",
      provinceId: "P003",
      countryId: "C002",
    },
  ];
  postcode: any[] = [
    {
      postcode: "50200",
      sub_districtId: "SD002",
      districtId: "D002",
      provinceId: "P001",
      countryId: "C001",
    },
    {
      postcode: "57100",
      sub_districtId: "SD001",
      districtId: "D001",
      provinceId: "P001",
      countryId: "C001",
    },
    {
      postcode: "12345",
      sub_districtId: "SD003",
      districtId: "D003",
      provinceId: "P003",
      countryId: "C002",
    },

  ];

  students: any[] = [
    {
      studentId: "65001",
      studentFirstName: "วันเพ็ญ",
      studentLastName: "เดือนสิบสอง",
      studentMajor: "วิศวคอมพิวเตอร์",
      studentFaculty: "ICT",
      studentYearClass: 4,
      countryId: "C001",
      provinceId: "P001",
      districtId: "D001",
      sub_districtId: "SD001",
      postcode: "57100",
    },
    {
      studentId: "65002",
      studentFirstName: "นำโชค",
      studentLastName: "ทัดสณะ",
      studentMajor: "วิทยาการคอมพิวเตอร์",
      studentFaculty: "ICT",
      studentYearClass: 4,
      countryId: "C001",
      provinceId: "P001",
      districtId: "D001",
      sub_districtId: "SD001",
      postcode: "57100",
    },
  ]
}
