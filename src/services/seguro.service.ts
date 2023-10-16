import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { SeguroRequest, SeguroRequestModify } from 'src/models/seguroRequest.interface';
import { SeguroResponse } from 'src/models/seguroResponse.model';



@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  API_URL=environment.apiURL;

  constructor(private http:HttpClient) { }


  getAllSeguros(){
    return this.http.get<SeguroResponse[]>(this.API_URL+"/GetSeguros");
  }


  createSeguro(seguro: SeguroRequest){
    return this.http.post(this.API_URL+"/CreateSeguros", seguro);
  }


  deleteSeguro(id:number){
    const params = new HttpParams()
            .append('id', id);
    const headers = new HttpHeaders().append(
              'Content-Type',
              'application/x-www-form-urlencoded'
          );

    var body = {};

    
    return this.http.post(this.API_URL+"/DeleteSeguros", body, {
      headers: headers,
      params: params,
  });
  }

  editSeguro(seguroRequest:SeguroResponse){
    return this.http.post(this.API_URL+"/ModifySeguros",seguroRequest);
  }

}