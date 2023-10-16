import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckOutRequest } from 'src/models/checkOutRequest.interface';
import {  SeguroResponse } from 'src/models/seguroResponse.model';
import { reservationRequest } from 'src/models/reservationRequest.interface';
import { ReservationResponse } from 'src/models/reservationResponse.interface';
import { RoomResponse } from 'src/models/roomResponse.interface';
import { SeguroService } from 'src/services/seguro.service';
import { ReservationService } from 'src/services/reservation.service';
import { AseguradoService } from 'src/services/asegurado.service';
import swal from'sweetalert2';
import { SeguroRequest, SeguroRequestModify } from 'src/models/seguroRequest.interface';
import { AseguradoRequest, AseguradoRequestModify } from 'src/models/aseguradoRequest.interface';
import { SeguroAseguradoService } from 'src/services/seguroAsegurado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'Sistema de Asignacion de Seguros';
  closeResult: string = "";
  roomsAv: RoomResponse[] = [];
  roomsNAv: RoomResponse[] = [];
  rooms: RoomResponse[]=[];

  chkRequest:CheckOutRequest = {reservationId:-1};

  cliente: number = 0;

  cedulaBuscar:string="";
  codigoBuscar:string="";
  seguroAv: SeguroResponse[] = [];
  cedulaBusqueda: SeguroResponse[] = [];
  disponibles: SeguroResponse[] = [];
  noDisponibles: SeguroResponse[] = [];
  seguroM: SeguroResponse = {idSeguro:0,codigoSeguro:"",nombreSeguro:"",prima:0,sumaAsegurada:0,seguroasegurados:[]};
  seguroRequest:SeguroRequest = {codigoSeguro:"",nombreSeguro:"",primaSeguro:0,sumaAseguradaSeguro:0};
  aseguradoRequest:AseguradoRequest = {cedulaAsegurado:"",fechaNacimiento:new Date(), nombreAsegurado:"", seguroasegurados:[],telefonoAsegurado:0};
  aseguradoAv: AseguradoRequestModify[] = [];
  codigoBusqueda: AseguradoRequestModify[] = [];
  aseguradoM:AseguradoRequestModify = {idAsegurado:0,cedulaAsegurado:"",fechaNacimiento:new Date(), nombreAsegurado:"", seguroasegurados:[],telefonoAsegurado:0};

  
  reservations : ReservationResponse[]=[];
  room: string="";
  reserv:reservationRequest={guestIdent: "",guestName:"",roomId:-1,reservationInDate: new Date(),reservationoutDate:new Date()};
  

  constructor(private modalService: NgbModal,private router: ActivatedRoute, private seguroService:SeguroService,private aseguradoService:AseguradoService, private SAservice: SeguroAseguradoService ,private reservationService: ReservationService){}

 
  


ngOnInit(): void {
  

  this.seguroService.getAllSeguros().subscribe(data=>{
    this.seguroAv = data;
  });

  this.aseguradoService.getAllAsegurados().subscribe(data=>{
    this.aseguradoAv = data;
  }); 


  this.reservationService.getReservationsOut().subscribe(data=>{
    this.reservations = data;
  });



}

ngAfterViewInit() {}


open(content: any) {
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg', windowClass: 'modal-xl'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    this.seguroService.getAllSeguros().subscribe(data=>{
      this.seguroAv = data;
    }); 
  }, (reason) => {
    this.closeResult = `Dismissed`;
    this.seguroService.getAllSeguros().subscribe(data=>{
      this.seguroAv = data;
    }); 
  });
  /*this.roomService.getAvailabilityRooms().subscribe(data=>{
    this.roomsAv = data;
    this.reservationService.getReservationsOut().subscribe(data=>{
      this.reservations = data;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg', windowClass: 'modal-xl'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed`;
      });
    });
  });*/
  
}


crearSeguro(){
  this.seguroService.createSeguro(this.seguroRequest).subscribe(
    (data:any)=>{
      swal.fire("Se ha creado el seguro exitosamente","", 'success');
      this.seguroService.getAllSeguros().subscribe(data=>{
        this.seguroAv = data;
      });    
  }, 
    error=>{swal.fire(error.error.title.toString(),"", 'error')}
  );

}

modificarSeguro(){
  this.seguroService.editSeguro(this.seguroM).subscribe((data:any)=>{
    swal.fire(data.message.toString(),"", 'success');
    this.seguroService.getAllSeguros().subscribe(data=>{
      this.seguroAv = data;
    });    
}, 
  error=>{swal.fire(error.toString(),"", 'error');}
);
}

abrirModificarSeguro(content: any, seguro:SeguroResponse){
  this.seguroM = seguro;
  this.open(content);
}

abrirModificarAsegurado(content: any, seguro:AseguradoRequestModify){
  this.aseguradoM = seguro;
  this.open(content);
}

onEditClick(value: any) {
  this.SAservice.getAllDisponibles(value.target.value).subscribe(data=>{
    this.disponibles = data;
  }); 

  this.SAservice.getAllNoDisponibles(value.target.value).subscribe(data=>{
    this.noDisponibles = data;
  });

  this.cliente = value.target.value;


}

buscarSeguro(){
 this.SAservice.buscarSeguro(this.codigoBuscar).subscribe(
  data=>this.codigoBusqueda = data,
  error=>this.codigoBusqueda=[]
 );
}

buscarCedula(){
  this.SAservice.buscarCedula(this.cedulaBuscar).subscribe(
    data=>this.cedulaBusqueda = data,
    error=>this.cedulaBusqueda=[]
   );
}


eliminarSeguro(id:number){
  this.seguroService.deleteSeguro(id).subscribe(
    (data:any)=>{
      swal.fire(data.message.toString(),"", 'success');
      this.seguroService.getAllSeguros().subscribe(data=>{
        this.seguroAv = data;
      });    
  }, 
    error=>{swal.fire(error.toString(),"", 'error');}
  );
}


eliminarSeguroAsegurado(idAsegurado:number,idSeguro:number){
  this.SAservice.deleteAsegurados(idAsegurado,idSeguro);
  this.SAservice.getAllDisponibles(idAsegurado).subscribe(data=>{
    this.disponibles = data;
  }); 

  this.SAservice.getAllNoDisponibles(idAsegurado).subscribe(data=>{
    this.noDisponibles = data;
  });

}

agregarSeguroAsegurado(idAsegurado:number,idSeguro:number){
  this.SAservice.createAsegurados(idAsegurado,idSeguro).subscribe(
    (data:any)=>{
      this.seguroService.getAllSeguros().subscribe(data=>{
        this.seguroAv = data;
      });  
      this.SAservice.getAllDisponibles(idAsegurado).subscribe(data=>{
        this.disponibles = data;
      }); 
    
      this.SAservice.getAllNoDisponibles(idAsegurado).subscribe(data=>{
        this.noDisponibles = data;
      });  
  }, 
    error=>{swal.fire(error.error.title.toString(),"", 'error')}
  );
}



crearAsegurado(){
  this.aseguradoService.createAsegurados(this.aseguradoRequest).subscribe(
    (data:any)=>{
      swal.fire("Se ha creado el asegurado exitosamente","", 'success');
      this.aseguradoService.getAllAsegurados().subscribe(data=>{
        this.aseguradoAv = data;
      });    
  }, 
    error=>{swal.fire(error.error.title.toString(),"", 'error')}
  );

}

modificarAsegurado(){
  this.aseguradoService.editAsegurados(this.aseguradoM).subscribe((data:any)=>{
    swal.fire(data.message.toString(),"", 'success');
    this.aseguradoService.getAllAsegurados().subscribe(data=>{
      this.aseguradoAv = data;
    });   
}, 
  error=>{swal.fire(error.toString(),"", 'error');}
);
}



eliminarAsegurado(id:number){
  this.aseguradoService.deleteAsegurados(id).subscribe(
    (data:any)=>{
      swal.fire(data.message.toString(),"", 'success');
      this.aseguradoService.getAllAsegurados().subscribe(data=>{
        this.aseguradoAv = data;
      });  
  }, 
    error=>{swal.fire(error.toString(),"", 'error');}
  );
}


saveCheckIn(){
  if(this.validate()){
    this.reservationService.checkIn(this.reserv).subscribe(
      (data:any)=>{
        swal.fire(data.message.toString(),"", 'success');
    }, 
      error=>swal.fire(error.error.toString(),"", 'error')
      );
  }else{
    swal.fire("Fill All the Fields to Continue","", 'warning');
  }
}

saveCheckOut(reservId:number){
  this.chkRequest.reservationId = reservId;
    this.reservationService.checkOut(this.chkRequest).subscribe(
      (data:any)=>{
        this.reservationService.getReservationsOut().subscribe(data=>{
          this.reservations = data;
        });
        swal.fire(data.message.toString(),"", 'success');
      }, 
      error=>swal.fire(error.error.toString(),"", 'error')
      );
}

validate(){

  if(this.reserv.guestIdent ==""){
    return false;
  }else{
    if(this.reserv.guestName == ""){
      return false
    }else{
      if(this.reserv.roomId == -1){
        return false;
      }else{
         return true
      }
    }
  }
}




}
