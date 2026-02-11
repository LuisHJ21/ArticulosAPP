import { Fish } from "lucide-react";
import type { Articulos } from "../../infraestructure/interfaces";
import { useArticuloContext } from "../../core/contexts/Articulo.context";

interface CardProps {
    item: Articulos;
    //handleSelectProduct: (item: any) => void;
}

export const Card = ({ item }: CardProps) => {

    const {seleccionarArticulo}= useArticuloContext();
  return (
    <div
       
       onClick={() => seleccionarArticulo(item)}
        className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-4 cursor-pointer hover:bg-slate-700 transition-colors"
    >
        <div className="w-16 h-16 bg-slate-700 rounded-xl flex justify-center items-center">
            <Fish size={24} className="text-blue-400" />
        </div>
        <div className="w-full">
          <h4 className="font-bold text-white text-sm mb-1">{item.descripcion}</h4>
          <span className="text-xs text-blue-400 font-mono">{item.codigo}</span>
        </div>
    </div>
  )
}
