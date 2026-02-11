import {  ArrowRight , Box, List, MapPin } from "lucide-react";
import type { Ubicaciones } from "../../infraestructure/interfaces";


interface CardProps
{
  item:Ubicaciones
  onSelect: (pallet: Ubicaciones) => void;
  getStatusStyles: (status: string) => {
        bg: string,
        border: string,
        text: string,
        icon: any,
        iconColor: string
    }
}



export const CardPallet = ({ item, onSelect ,getStatusStyles}:CardProps) => {
  const pesoTotal = item.pesoTotal

  const estados=[
    {id:"1", nombre:"Completo"},
    {id:"2", nombre:"Incompleto"},
    {id:"3", nombre:"Mixto"}
  ]

 

  const NombreEstado = estados.find(e=>e.id===item.estado)?.nombre;
  const styles = getStatusStyles(item.estado);
  const StatusIcon = styles.icon;

  return (
    <div className="w-full lg:max-w-[350px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group active:scale-[0.98] transition-all duration-200 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4">
      
      {/* Barra Superior de Color */}
      <div className={`h-1.5 w-full ${styles.bg.replace('bg-', 'bg-gradient-to-r from-white to-').replace('50', '500')}`}></div>

    

      <div className="p-4 flex-1 flex flex-col">
        {/* Cabecera Principal */}
        <div className="flex items-start justify-between mb-3 mt-1">
          <div className="flex gap-3">
             <div className="h-12 w-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                <Box size={24} className="text-slate-700" strokeWidth={1.5} />
             </div>
             <div>
               <h3 className="text-lg font-black text-slate-800 leading-tight">{item.numPallet}</h3>
               <div className="flex items-center gap-1 mt-1 text-slate-500">
                 <MapPin size={14} />
                 <span className="text-xs font-mono font-bold">{item.ubicacion}</span>
               </div>
             </div>
          </div>
        </div>

        {/* --- VISTA ÚNICA DE TABLA --- */}
        <div className="bg-slate-50/80 rounded-xl border border-slate-100 flex-1 overflow-hidden flex flex-col">
           <div className="bg-slate-100 px-3 py-2.5 border-b border-slate-200 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <List size={12}/> ITEMS ({item.detalles.length})
              </span>
              <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                Total: {pesoTotal.toLocaleString()} kg
              </span>
           </div>
           
           <div className="p-1 overflow-y-auto max-h-[140px] scrollbar-thin scrollbar-thumb-slate-200 flex-1 touch-pan-y">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10">
                  <tr>
                    {/* <th className="text-[9px] uppercase text-slate-400 font-bold p-2 pl-2 border-b border-slate-100">Lote</th> */}
                    <th className="text-[9px] uppercase text-slate-400 font-bold p-2 border-b border-slate-100">Fechas Prod</th>
                    {/* <th className="text-[9px] uppercase text-slate-400 font-bold p-2 text-right pr-2 border-b border-slate-100">Kg</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* {item.detalles.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-white active:bg-blue-50 transition-colors group/row">
                      <td className="p-2 pl-2 text-[11px] font-bold text-slate-700 font-mono group-hover/row:text-blue-600 transition-colors">
                        {item.lote}
                      </td>
                      <td className="p-2 text-[11px] text-slate-500 font-medium">{item.fechaProd}</td>
                      <td className="p-2 pr-2 text-[11px] font-bold text-slate-700 text-right">{item.peso}</td>
                    </tr>
                  ))} */}
                  <tr  className="border-b border-slate-100 last:border-0 hover:bg-white active:bg-blue-50 transition-colors group/row">
                     
                      <td className="p-2 text-[11px] text-slate-500 font-medium">{item.fechasProduccion.join(', ')}</td>
                      
                    </tr>
                </tbody>
              </table>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
           <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border ${styles.bg} ${styles.border}`}>
              <StatusIcon size={14} color={styles.iconColor} strokeWidth={2.5} />
              <span className={`text-[10px] font-black uppercase tracking-wide ${styles.text}`}>
                {NombreEstado}
              </span>
           </div>
           
           <button
           onClick={()=>onSelect(item)}
           className="text-xs font-bold text-slate-400 flex items-center gap-1 px-2 py-1 active:text-blue-600 transition-colors">
             Ver Detalle <ArrowRight size={14} />
           </button>
        </div>

      </div>
    </div>
  );
};