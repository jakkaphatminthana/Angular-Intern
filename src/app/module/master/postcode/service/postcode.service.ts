import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostcodeService {

  private serviceUrl: string = environment.apiUrl + '/postcode'

  constructor(
    private http: HttpClient,
  ) {

  }

  //Find-all
  public all() {
    return this.http.get<any[]>(this.serviceUrl + '/search');
  }

  //Greather than Equal
  public gt(postcodeId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (postcodeId != null) {
      queryParams = queryParams.append("id", postcodeId);
    }

    return this.http.get<any[]>(this.serviceUrl + '/search/gt', { params: queryParams });
  }

  //Less than Equal
  public lt(postcodeId: number) {
    //ส่งค่าให้ postman มั้ง
    let queryParams = new HttpParams();
    if (postcodeId != null) {
      queryParams = queryParams.append("id", postcodeId);
    }
    return this.http.get<any[]>(this.serviceUrl + '/search/lt', { params: queryParams });
  }
}
