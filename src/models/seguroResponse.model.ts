export interface SeguroResponse {
    idSeguro:         number;
    nombreSeguro:     string;
    codigoSeguro:     string;
    sumaAsegurada:    number;
    prima:            number;
    seguroasegurados: any[];
}
