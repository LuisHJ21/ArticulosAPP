import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { Articulos } from "../../infraestructure/interfaces";

interface ArticuloContextProps {
    articuloSeleccionado: Articulos|null;
    seleccionarArticulo: (articulo: Articulos|null) => void;
    limpiarArticuloSeleccionado: () => void;
    
    
}

 const ArticuloContext = createContext<ArticuloContextProps | null>(null);


 export const ArticuloContextProvider = ({children}:PropsWithChildren)=>{
       const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulos|null>(null);

        const seleccionarArticulo = (articulo: Articulos|null) => {
            setArticuloSeleccionado(articulo);
        }

        const limpiarArticuloSeleccionado = () => {
            setArticuloSeleccionado(null);
        }
    return (
       <ArticuloContext.Provider
            value={{
              articuloSeleccionado,
              seleccionarArticulo,
              limpiarArticuloSeleccionado
            }}
        >

            {children}
        </ArticuloContext.Provider>
    )
 }


 
export const useArticuloContext = () => {
    const context = useContext(ArticuloContext);

    if (!context) {
        throw new Error(
            'useArticuloContext debe usarse dentro de ArticuloContextProvider'
        );
    }

    return context;
};