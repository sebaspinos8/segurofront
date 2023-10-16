import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { AseguradoRequest, AseguradoRequestModify } from 'src/models/aseguradoRequest.interface';
import { SeguroRequest, SeguroRequestModify } from 'src/models/seguroRequest.interface';
import { SeguroResponse } from 'src/models/seguroResponse.model';



@Injectable({
  providedIn: 'root'
})
export class AseguradoService {

  API_URL=environment.apiURL;

  constructor(private http:HttpClient) { }


  getAllAsegurados(){
    return this.http.get<AseguradoRequestModify[]>(this.API_URL+"/GetAsegurados");
  }


  createAsegurados(asegurado: AseguradoRequest){
    return this.http.post(this.API_URL+"/CreateAsegurados", asegurado);
  }


  deleteAsegurados(id:number){
    const params = new HttpParams()
            .append('id', id);
    const headers = new HttpHeaders().append(
              'Content-Type',
              'application/x-www-form-urlencoded'
          );

    var body = {};

    
    return this.http.post(this.API_URL+"/DeleteAsegurado", body, {
      headers: headers,
      params: params,
  });
  }

  editAsegurados(aseguradoRequest:AseguradoRequestModify){
    return this.http.post(this.API_URL+"/ModifyAsegurado",aseguradoRequest);
  }

}