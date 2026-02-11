import { Box, Calendar, List, MapPin, QrCode, Scale, X } from "lucide-react";
import type { Ubicaciones } from "../../infraestructure/interfaces";

interface ModalProps
{
    data: Ubicaciones,
    onClose: () => void,
    getStatusStyles: (status: string) => {
        bg: string,
        border: string,
        text: string,
        icon: any,
        iconColor: string
    }
}


export const PalletModal = ({ data, onClose, getStatusStyles }: ModalProps) => {
  if (!data) return null;

  const displayStatus = data.estado === '1' ? 'Completo' : 'Incompleto';
  const styles = getStatusStyles(displayStatus);
  const StatusIcon = styles.icon;
  const totalWeight = data.pesoTotal

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (Fondo oscuro con desenfoque) */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Ventana Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        
        {/* Cabecera Modal */}
        <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-start relative overflow-hidden">
           {/* Barra de color decorativa */}
           <div className={`absolute top-0 left-0 w-1.5 h-full ${styles.bg.replace('bg-', 'bg-gradient-to-b from-').replace('50', '500')}`}></div>
           
           <div className="flex gap-4 pl-2">
              <div className="h-14 w-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm text-slate-700">
                 <Box size={28} strokeWidth={1.5} />
              </div>
              <div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">N° de Pallet</span>
                 <h2 className="text-2xl font-black text-slate-800 leading-none mb-2">{data.numPallet}</h2>
                 <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${styles.bg} ${styles.border}`}>
                    <StatusIcon size={14} color={styles.iconColor} strokeWidth={2.5} />
                    <span className={`text-[10px] font-black uppercase tracking-wide ${styles.text}`}>
                      {displayStatus}
                    </span>
                 </div>
              </div>
           </div>

           <button 
             onClick={onClose}
             className="p-2 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
           >
             <X size={20} />
           </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
           
           {/* Grid de Info General */}
           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Ubicación</span>
                 </div>
                 <span className="font-mono font-bold text-slate-700">{data.ubicacion}</span>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <Scale size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Peso Total</span>
                 </div>
                 <span className="font-mono font-bold text-slate-700">{totalWeight.toLocaleString()} kg</span>
              </div>
           </div>

           {/* Tabla Detallada */}
           <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <List size={16} className="text-slate-400"/>
                Items
              </h3>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Lote</th>
                      <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Producción</th>
                      <th className="p-3 text-[10px] font-bold text-slate-500 uppercase text-right">Peso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.detalles.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3">
                           <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-slate-700 font-mono">{item.lote}</span>
                           </div>
                        </td>
                        <td className="p-3">
                           <div className="flex items-center gap-2">
                             <span className="text-xs text-slate-600">{item.fechaProd}</span>
                           </div>
                        </td>
                        <td className="p-3 text-right">
                           <span className="text-xs font-bold text-slate-800">{item.peso} kg</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
           <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
             Cerrar
           </button>
        </div>

      </div>
    </div>
  );
};