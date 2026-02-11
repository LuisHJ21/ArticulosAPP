import type { AlmacenDB } from "../../infraestructure/interfaces/almacenes.interface";
import type { ArticuloDB } from "../../infraestructure/interfaces/articulosSearch.interface";
import { ArticuloMapper } from "../../infraestructure/mappers/Articulo.mapper";
import { AuthAPI } from "../api";


const endpoint = "/articulo";

const getArticulos = async (term: string) => {
    try {
        const response = await AuthAPI.get(endpoint, {
            params: {
                search: term
            }
        });

        const {data} = response.data;
        return data.map((articulo: ArticuloDB) => ArticuloMapper.toArticulo(articulo));

    } catch (error) {
        console.error(error);
    }
}

const getSaldosAlmacen=async(codigo:string)=>{
    try {
        const response = await AuthAPI.get(`almacen/saldos`,{
            params:{
                articulo:codigo
            }
        });

        const {data} = response.data;
        return data.map((almacen: AlmacenDB) => ArticuloMapper.toAlmacen(almacen));
    } catch (error) {
        console.error(error);
    }
}

export const getUbicaciones=async(codigo:string,almacen:string)=>{
    try {
        const response = await AuthAPI.get(`almacen/ubicaciones`,{
            params:{
                articulo:codigo,
                almacen:almacen
            }
        });

        const {ubicaciones,lotes}=response.data

        
       return {
        ubicaciones,
        lotes
       }
       
       
    } catch (error) {
        console.error(error);
    }
}

export const ArticuloService = {
    getArticulos,
    getSaldosAlmacen  ,
    getUbicaciones  
}