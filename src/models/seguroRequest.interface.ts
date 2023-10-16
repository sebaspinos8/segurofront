export interface SeguroRequest {
    nombreSeguro:        string;
    codigoSeguro:        string;
    sumaAseguradaSeguro: number;
    primaSeguro:         number;
}

export interface SeguroRequestModify {
    idSeguro:            number;
    nombreSeguro:        string;
    codigoSeguro:        string;
    sumaAseguradaSeguro: number;
    primaSeguro:         number;
}
