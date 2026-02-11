import type { Almacenes, Articulos } from "../interfaces";
import type { AlmacenDB } from "../interfaces/almacenes.interface";
import type { ArticuloDB } from "../interfaces/articulosSearch.interface";
//import type { UbicacionesDB } from "../interfaces/ubicaciones.interface";

export class ArticuloMapper {
    static toArticulo(articulo: ArticuloDB): Articulos {
        return {
            codigo: articulo.COD_ART??'',
            descripcion: articulo.DESC_ART??'',
            peso: articulo.PESO_UND??'',
            codigoSubcategoria: articulo.COD_SUB_CAT??'',
            codigoCategoria: articulo.CAT_ART??'',
            subcategoria: articulo.DESC_SUB_CAT??'',
            categoria: articulo.DESC_CATEGORIA??'',
            saldoTotal:isNaN(Number(articulo.SLDO_TOTAL))?0:Number(articulo.SLDO_TOTAL)
        }
    }

    static toAlmacen(almacen: AlmacenDB): Almacenes {
        return {
            almacen: almacen.ALMACEN??'',
            saldoTotal:isNaN(Number(almacen.SLDO_TOTAL))?0:Number(almacen.SLDO_TOTAL)
        }
    }
    
    /*static toUbicaciones(ubicaciones: UbicacionesDB): Ubicaciones {
        return {
            numPallet:ubicaciones.NUM_PALLET??'',
        
            pesoTotal: ubicaciones.PESO??'',
            codigoTraza: ubicaciones.COD_TRAZA??'',
            fechaProduccion: ubicaciones.FECH_PRODU??'',
            codigoRack: ubicaciones.COD_RACK??''
        }
    }*/
    
}