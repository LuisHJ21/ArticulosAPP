import { useState } from 'react'
import type {  Ubicaciones } from '../../infraestructure/interfaces';

import {
  Check,
  Filter,
  ChevronUp,
  ChevronDown,
  Box,
  AlertCircle,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { CardPallet } from './CardPallet';
import { PalletModal } from './PalletModal';

interface InfoProps
{
    ubicacionesAlmacen:Ubicaciones[],
   
}

interface Filtro 
{
  id:string
  nombre:string
}


const InfoPallets = ({ubicacionesAlmacen}:InfoProps) => {
 const filters = [
    {id:"5",nombre:'Todos'},
    {id:"1", nombre:"Completo"},
    {id:"2", nombre:"Incompleto"},
    //{id:"3", nombre:"Mixto"}
  ];
      const [filter, setFilter] = useState<Filtro>(filters[0]);
      const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedPallet, setSelectedPallet] = useState<Ubicaciones | null>(null); 
        
     const getStatusStyles = (estado:string) => {
    switch (estado) {
      case '1':
        return { 
          bg: 'bg-emerald-50', border: 'border-emerald-200', 
          text: 'text-emerald-700', icon: CheckCircle2, iconColor: '#059669' 
        };
      case '2':
        return { 
          bg: 'bg-amber-50', border: 'border-amber-200', 
          text: 'text-amber-700', icon: AlertCircle, iconColor: '#d97706' 
        };
      case '3': 
        return { 
          bg: 'bg-purple-50', border: 'border-purple-200', 
          text: 'text-purple-700', icon: Layers, iconColor: '#7e22ce' 
        };
      
      default:
        return { 
          bg: 'bg-slate-50', border: 'border-slate-200', 
          text: 'text-slate-600', icon: Box, iconColor: '#64748b' 
        };
    }
  };
    
        // Lógica de filtrado
      const filteredCards = ubicacionesAlmacen.filter(card => {
        if (filter.id==='5') return true;
        const displayStatus =  card.estado;
        return displayStatus === filter.id;
      });
    
  return (
    <>
            {/* --- FILTRO DESPLEGABLE --- */}
            <div className="relative z-30 flex justify-center">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-3 bg-white pl-4 pr-5 py-3 rounded-2xl shadow-sm border border-slate-200 active:scale-95 transition-all w-full md:w-auto justify-between md:justify-center group"
              >
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-100 p-2 rounded-xl group-hover:bg-blue-50 transition-colors">
                      <Filter size={18} className="text-slate-500 group-hover:text-blue-500"/>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Filtrando por</span>
                      <span className="text-sm font-black text-slate-800 block leading-tight">{filter.nombre}</span>
                    </div>
                  </div>
                  {isFilterOpen ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
              </button>

              {/* Menú Desplegable */}
              {isFilterOpen && (
                <>
                  {/* Overlay invisible para cerrar al hacer click fuera */}
                  <div className="fixed inset-0 z-20" onClick={() => setIsFilterOpen(false)}></div>
                  
                  <div className="absolute top-full mt-2 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in slide-in-from-top-2 fade-in duration-200 z-30">
                    {filters.map(opcion => (
                      <button
                          key={opcion.id}
                          onClick={() => {
                            setFilter(opcion);
                            setIsFilterOpen(false);
                          }}
                          className={`
                            w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all
                            ${filter.id === opcion.id 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'text-slate-500 hover:bg-slate-50 active:bg-slate-100'}
                          `}
                      >
                          <span>{opcion.nombre}</span>
                          {filter.id === opcion.id && <Check size={16} className="text-blue-600"/>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Lista de PALLETS-RACKS */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 mt-2 max-h-screen overflow-y-scroll flex sm:flex-col lg:flex-row gap-3 flex-wrap  justify-around">
              {/* DISEÑAR LISTA DE UBICACIONES */}
              

              {
                filteredCards.length>0?(
                  filteredCards.map((ubicacion, index) => (
                    <CardPallet key={index} item={ubicacion} onSelect={setSelectedPallet} getStatusStyles={getStatusStyles}/>
                  ))
                ):(

                  <div className="flex flex-col items-center justify-center py-12 opacity-50">
                    <Box size={48} className="text-slate-300" />
                    <span className="mt-2 text-sm text-slate-400">Sin resultados</span>
                  </div>
                )

              
              
              }

            </div>

    {
        selectedPallet && (
            <PalletModal
            onClose={() => setSelectedPallet(null)}
            data={selectedPallet}
            getStatusStyles={getStatusStyles}
            />
        )
    }
    </>
  )
}

export default InfoPallets