import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private serviceUrl: string = environment.apiUrl + '/province'

  constructor(private http:HttpClient) {}

  //Find-all
  public all() {
    return this.http.get<any[]>(this.serviceUrl + '/search');  
  }

  //Greather than Equal
  public gt(provinceId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (provinceId != null) {
      queryParams = queryParams.append("id", provinceId);
    }

    return this.http.get<any[]>(this.serviceUrl + '/search/gt', {params: queryParams});  
  }

  //Less than Equal
  public lt(provinceId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (provinceId != null) {
      queryParams = queryParams.append("id", provinceId);
    }
    return this.http.get<any[]>(this.serviceUrl + '/search/lt', {params: queryParams});  
  }

  public pageable(pageNo: number, pageSize:number, sortBy:string, order:string, provinceFrom:number, provinceTo:number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageNo", pageNo);
    queryParams = queryParams.append("pageSize", pageSize);
    queryParams = queryParams.append("sortBy", sortBy);
    queryParams = queryParams.append("order", order);
    if (provinceFrom != null) {
      queryParams = queryParams.append("provinceFrom", provinceFrom);
    }
    if (provinceTo != null) {
      queryParams = queryParams.append("provinceTo", provinceTo);
    }
    return this.http.get<any[]> (this.serviceUrl + '/search/pageable', {params: queryParams});
  }
}
