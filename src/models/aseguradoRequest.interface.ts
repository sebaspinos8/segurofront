export interface AseguradoRequest {
    cedulaAsegurado:   string;
    nombreAsegurado:   string;
    telefonoAsegurado: number;
    fechaNacimiento:   Date;
    seguroasegurados:  any[];
}

export interface AseguradoRequestModify {
    idAsegurado:       number;
    cedulaAsegurado:   string;
    nombreAsegurado:   string;
    telefonoAsegurado: number;
    fechaNacimiento:   Date;
    seguroasegurados:  any[];
}

