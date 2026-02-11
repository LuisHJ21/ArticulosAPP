
export interface Articulos {
    codigo:string,
    descripcion:string,
    peso:string,
    codigoCategoria:string,
    categoria:string,
    codigoSubcategoria:string,
    subcategoria:string,
    saldoTotal:number,
}

export interface Almacenes {
    almacen:string,
    saldoTotal:number,
}



export interface Ubicaciones {
    numPallet:string,
    estado:string,
    ubicacion:string,
    pesoTotal:string,
    detalles:UbicacionesDetalle[]
    fechasProduccion:string[]
}

export interface UbicacionesDetalle {
    
    item:string,
    peso:string,
    traza:string,
    fechaProd:string,
    lote:string,
    
}
