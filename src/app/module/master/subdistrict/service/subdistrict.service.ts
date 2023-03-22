import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubdistrictService {

  private serviceUrl: string = environment.apiUrl + '/subdistrict'

  constructor(private http:HttpClient) { }

  //TODO : Find-all
  public all() {
    return this.http.get<any[]>(this.serviceUrl + '/search');  
  }

  //TODO : Greather than Equal
  public gt(subdistrictId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (subdistrictId != null) {
      queryParams = queryParams.append("id", subdistrictId);
    }

    return this.http.get<any[]>(this.serviceUrl + '/search/gt', {params: queryParams});  
  }

  //TODO : Less than Equal
  public lt(subdistrictId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (subdistrictId != null) {
      queryParams = queryParams.append("id", subdistrictId);
    }
    return this.http.get<any[]>(this.serviceUrl + '/search/lt', {params: queryParams});  
  }
}
