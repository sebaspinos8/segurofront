import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservationRequest } from '../models/reservationRequest.interface';
import { CheckOutRequest } from 'src/models/checkOutRequest.interface';
import { ReservationResponse } from 'src/models/reservationResponse.interface';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  API_URL=environment.apiURL;

  constructor(private http:HttpClient) { }

  checkIn(request: reservationRequest){
    return this.http.post(this.API_URL+"/CheckIn", request);
  }


  checkOut(request: CheckOutRequest){
    return this.http.post(this.API_URL+"/CheckOut", request);
  }


  getReservationsOut(){
    return this.http.get<ReservationResponse[]>(this.API_URL+"/GetReservationsOut");
  }
}