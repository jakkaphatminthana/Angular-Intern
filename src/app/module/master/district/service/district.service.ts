import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private serviceUrl: string = environment.apiUrl + '/district'

  constructor(private http:HttpClient) { }

  //TODO : Find-all
  public all() {
    return this.http.get<any[]>(this.serviceUrl + '/search');  
  }

  //TODO : Greather than Equal
  public gt(districtId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (districtId != null) {
      queryParams = queryParams.append("id", districtId);
    }

    return this.http.get<any[]>(this.serviceUrl + '/search/gt', {params: queryParams});  
  }

  //TODO : Less than Equal
  public lt(districtId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (districtId != null) {
      queryParams = queryParams.append("id", districtId);
    }
    return this.http.get<any[]>(this.serviceUrl + '/search/lt', {params: queryParams});  
  }
}
