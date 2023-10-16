import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { AseguradoRequest, AseguradoRequestModify } from 'src/models/aseguradoRequest.interface';
import { SeguroAseguradoResponse } from 'src/models/seguroAseguradoResponse.interface';
import { SeguroRequest, SeguroRequestModify } from 'src/models/seguroRequest.interface';
import { SeguroResponse } from 'src/models/seguroResponse.model';
import swal from'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class SeguroAseguradoService {

  API_URL=environment.apiURL;

  constructor(private http:HttpClient) { }


  getAllDisponibles(idAsegurado:number){
    const params = new HttpParams()
    .append('idAsegurado', idAsegurado);
    const headers = new HttpHeaders().append(
        'Content-Type',
        'application/x-www-form-urlencoded'
    );

    return this.http.get<SeguroResponse[]>(this.API_URL+"/GetSegurosxClienteDisponibles", {
    headers: headers,
    params: params,
    });

  }

  getAllNoDisponibles(idAsegurado:number){

    const params = new HttpParams()
    .append('idAsegurado', idAsegurado);
    const headers = new HttpHeaders().append(
        'Content-Type',
        'application/x-www-form-urlencoded'
    );

    return this.http.get<SeguroResponse[]>(this.API_URL+"/GetSegurosxClienteNoDisponibles", {
    headers: headers,
    params: params,
    });
  }


  createAsegurados(idAsegurado:number,idSeguro:number){
    const params = new HttpParams()
            .append('idAsegurado', idAsegurado)
            .append('idSeguro', idSeguro);
    const headers = new HttpHeaders().append(
              'Content-Type',
              'application/x-www-form-urlencoded'
          );

    var body = {};

    
    return this.http.post(this.API_URL+"/CreateSeguroAsegurados", body, {
      headers: headers,
      params: params,
  });
  }


  buscarSeguro(codigoSeguro:string){
    const params = new HttpParams()
    .append('codigo', codigoSeguro);
    const headers = new HttpHeaders().append(
        'Content-Type',
        'application/x-www-form-urlencoded'
    );

    return this.http.get<AseguradoRequestModify[]>(this.API_URL+"/GetAseguradosPorCodigo", {
    headers: headers,
    params: params,
    });
  }


  buscarCedula(cedula:string){
    const params = new HttpParams()
    .append('cedula', cedula);
    const headers = new HttpHeaders().append(
        'Content-Type',
        'application/x-www-form-urlencoded'
    );

    return this.http.get<SeguroResponse[]>(this.API_URL+"/GetSegurosPorCedula", {
    headers: headers,
    params: params,
    });
  }


  deleteAsegurados(idAsegurado:number, idSeguro:number){
    
    const params = new HttpParams()
            .append('idAsegurado', idAsegurado)
            .append('idSeguro', idSeguro);
    const headers = new HttpHeaders().append(
              'Content-Type',
              'application/x-www-form-urlencoded'
          );

    var body = {};

    this.http.get<SeguroAseguradoResponse[]>(this.API_URL+"/GetSegurosAsegurados", {
        headers: headers,
        params: params,
    }).subscribe(data=>{
        const params2 = new HttpParams()
            .append('id', data[0].idseguroAsegurado);
        return this.http.post(this.API_URL+"/DeleteSeguroAsegurado", body, {
        headers: headers,
        params: params2,
    }).subscribe(data=>{
        swal.fire("Se ha eliminado exitosamente","", 'success');
        window.location.reload();
    },error=>{console.log(error)});
    }); 

    
  }

  editAsegurados(aseguradoRequest:AseguradoRequestModify){
    return this.http.post(this.API_URL+"/ModifyAsegurado",aseguradoRequest);
  }

}