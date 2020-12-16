export interface Municipio {
    CODAUTO: string;
    CPRO: string;
    CMUN: string;
    DC: string;
    NOMBRE: string;
}



export interface Provincia {
    CCOM: string;
    CPRO: string;
    PRO: string;
}



export interface Origen {
    productor: string;
    web: string;
    enlace: string;
    language: string;
    copyright: string;
    notaLegal: string;
}

export interface EstadoCielo {
    value: string;
    periodo: string;
    descripcion: string;
}

export interface Precipitacion {
    value: string;
    periodo: string;
}

export interface ProbPrecipitacion {
    value: string;
    periodo: string;
}

export interface ProbTormenta {
    value: string;
    periodo: string;
}

export interface Nieve {
    value: string;
    periodo: string;
}

export interface ProbNieve {
    value: string;
    periodo: string;
}

export interface Temperatura {
    value: string;
    periodo: string;
}

export interface SensTermica {
    value: string;
    periodo: string;
}

export interface HumedadRelativa {
    value: string;
    periodo: string;
}

export interface VientoAndRachaMax {
    direccion: string[];
    velocidad: string[];
    periodo: string;
    value: string;
}

export interface Dia {
    estadoCielo: EstadoCielo[];
    precipitacion: Precipitacion[];
    probPrecipitacion: ProbPrecipitacion[];
    probTormenta: ProbTormenta[];
    nieve: Nieve[];
    probNieve: ProbNieve[];
    temperatura: Temperatura[];
    sensTermica: SensTermica[];
    humedadRelativa: HumedadRelativa[];
    vientoAndRachaMax: VientoAndRachaMax[];
    fecha: Date;
    orto: string;
    ocaso: string;
}

export interface Prediccion {
    dia: Dia[];
}

export interface RespuestaPrediccionHorariaMunicipio {
    origen: Origen;
    elaborado: Date;
    nombre: string;
    provincia: string;
    prediccion: Prediccion;
    id: string;
    version: string;
}

