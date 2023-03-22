import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProvinceSB } from '../../request-get/request-get-object';

@Component({
  selector: 'app-province-search',
  templateUrl: './province-search.component.html',
  styleUrls: ['./province-search.component.scss']
})
export class ProvinceSearchComponent implements OnInit {
parseInt(arg0: string) {
throw new Error('Method not implemented.');
}
  provincesList: ProvinceSB[] = [];
  data: ProvinceSB[] = [];
  term: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //GET province 
    this.http.get<ProvinceSB[]>('http://127.0.0.1:8080/province/search').subscribe(response => {
      console.log(response)
      this.provincesList = response;  
      this.data = response;
    });
  }

  //================================================================================================================================
  filter(provinceId: string) {
    console.log(provinceId);
    
    //GET province 
    this.http.get<ProvinceSB[]>('http://127.0.0.1:8080/province/'+Number(provinceId)).subscribe(response => {
      console.log(response)
      this.provincesList = response;  
    });
  }

  filter2() {
    this.provincesList = this.data.filter((object) => {
      return object.provinceName.toLowerCase().includes(this.term?.toLowerCase())
    });
  }

  clear() {
    //GET province 
    this.http.get<ProvinceSB[]>('http://127.0.0.1:8080/province').subscribe(response => {
      console.log(response)
      this.provincesList = response;  
    });
  }

}
