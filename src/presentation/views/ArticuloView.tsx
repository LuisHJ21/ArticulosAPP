import  { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Box,
  MapPin,
  Snowflake,
  Tag,
  FileText,
} from 'lucide-react';
import { Buscardor } from '../components/Buscardor';
import { useArticuloContext } from '../../core/contexts/Articulo.context';
import { ArticuloService } from '../../core/services/articulo.service';
import type { Almacenes, Ubicaciones } from '../../infraestructure/interfaces';
import InfoPallets from '../components/InfoPallets';
import InfoLotes from '../components/InfoLotes';


export default function ArticuloView() {
 

  const [activeTab, setActiveTab] = useState<string>("");
  const [almacenesDisp,setAlmacenesDisp]=useState<Almacenes[]>([]);
  const [ubicacionesAlmacen,setUbicacionesAlmacen]=useState<Ubicaciones[]>([]);
  const [lotesAlmacen,setLotesAlmacen]=useState<{nroLote:string,total:string}[]>([]);

  const  {articuloSeleccionado,seleccionarArticulo} =useArticuloContext()

  const almacenSeleccionado = useRef<Almacenes|null>(null);
  


  

  const obtenerSaldosAlmacen=async()=>
  {
    if(!articuloSeleccionado) return;
      const peticion = await ArticuloService.getSaldosAlmacen(articuloSeleccionado.codigo);
      setAlmacenesDisp(peticion);
      setActiveTab(peticion[0].almacen);
      almacenSeleccionado.current=peticion[0];
      obtenerUbicaciones(peticion[0].almacen)
  }

  const obtenerUbicaciones=async(almacen:string)=>{
    if(!articuloSeleccionado) return;
    const peticion = await ArticuloService.getUbicaciones(articuloSeleccionado.codigo,almacen);

    if(!peticion) 
    {
      setUbicacionesAlmacen([])
      return;
    }
    
    setUbicacionesAlmacen(peticion.ubicaciones);
    setLotesAlmacen(peticion.lotes)
    console.log(peticion)
  }

  useEffect(() => {
    if (articuloSeleccionado) {
     obtenerSaldosAlmacen()
    }
  }, [articuloSeleccionado]);

  useEffect(() => {
    
    if (activeTab) {
      obtenerUbicaciones(activeTab)
    }
  }, [activeTab]);


  // --- VISTA HOME ---
  if (!articuloSeleccionado) {
    return (
      <Buscardor/>
    );
  }

  // --- VISTA DETALLE ---

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">

      {/* Header Detalle (Fondo Oscuro) */}
      <div className="bg-slate-900 px-6 pt-6 pb-16 rounded-b-[40px] relative z-10 shadow-2xl">
        {/* Nav Bar */}
        <div className="flex justify-between mb-6">
          <button onClick={() => seleccionarArticulo(null)} className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-colors">
            <ArrowLeft size={20} className="text-slate-200" />
          </button>
          x
        </div>

        {/* Info Producto */}
        <div className="mb-6">
          <div className="flex items-center self-start bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg mb-3 gap-2 w-max">
            <span className="text-[10px] font-bold text-blue-400 tracking-wider">CÓDIGO</span>
            <span className="text-xs font-bold text-blue-200 font-mono">{articuloSeleccionado.codigo}</span>
          </div>

          <h1 className="text-2xl font-black text-white mb-2 leading-8">{articuloSeleccionado.descripcion}</h1>

        </div>

        {/* CATEGORIA Y SUBCATEGORIA */}
        <div className="flex gap-3">
          <div className=" w-1/2 px-1 bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60 flex items-center gap-3">
            <div className="bg-slate-700 p-1.5 rounded-lg">
              <Tag size={14} className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-[9px] font-bold text-slate-400 uppercase mb-0.5 block">Categoría</span>
              <span className="text-xs font-bold text-slate-200 block truncate">{articuloSeleccionado.categoria}</span>
            </div>
          </div>

          <div className=" w-1/2 px-1 bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60 flex items-center gap-3">
            <div className="bg-slate-700 p-1.5 rounded-lg">
              <FileText size={14} className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-[9px] font-bold text-slate-400 uppercase mb-0.5 block">Sub-Categoría</span>
              <span className="text-xs font-bold text-slate-200 block truncate">{articuloSeleccionado.subcategoria}</span>
            </div>
          </div>
        </div>

        {/* Tarjeta Flotante: STOCK TOTAL GLOBAL (Absolute) */}
        <div className="absolute -bottom-10 left-6 right-6 bg-white p-4 rounded-2xl flex justify-between items-center shadow-lg border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5 block">Stock Total </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-800 tracking-tight">{articuloSeleccionado.saldoTotal.toLocaleString()}</span>
              <span className="text-xs font-bold text-slate-500">KGR</span>
            </div>
          </div>
          <div className="bg-blue-50 p-3.5 rounded-2xl">
            <Box size={28} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Espaciador para la tarjeta flotante */}
      <div className="h-14"></div>
      {/* Tabs */}
      <div className="h-14 mt-2 overflow-x-auto no-scrollbar px-4 flex items-center">
        <div className="flex gap-2">
            {almacenesDisp.map(almacen => {
              const isActive = activeTab === almacen.almacen;
              return (
                <button
                  key={almacen.almacen}
                  onClick={() =>{
                     setActiveTab(almacen.almacen);
                     almacenSeleccionado.current=almacen;
                  }}
                  className={`flex items-center px-4 py-2.5 rounded-xl border gap-2 transition-all whitespace-nowrap ${isActive ? 'bg-slate-800 border-slate-800 shadow-sm' : 'bg-white border-slate-200'
                    }`}
                >
                  <Snowflake size={14} className={isActive ? "text-blue-400" : "text-slate-400"} />
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {almacen.almacen}
                  </span>
                </button>
              )
            })}

          
        </div>
      </div>
      {/* Contenido Principal */}
      <div className="flex-1 px-4 pt-4 overflow-y-auto pb-10">
        {!activeTab || almacenSeleccionado?.current?.saldoTotal === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 opacity-50">
            <MapPin size={48} className="text-slate-300" />
            <span className="mt-2 text-sm text-slate-400">Sin stock en esta cámara</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
{/* TARJETA DE STOCK POR ALMACEN */}
            <div className="bg-white border border-blue-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock en {almacenSeleccionado.current?.almacen}</span>
                  
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">
                    {almacenSeleccionado.current?.saldoTotal.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-500">KGR</span>
                </div>
               
              </div>

              <div className="w-10 h-10 bg-blue-500 rounded-xl flex justify-center items-center shadow-md shadow-blue-200">
                <Box size={20} className="text-white" />
              </div>
            </div>

            {
              ubicacionesAlmacen.length>0 ? (
                <InfoPallets ubicacionesAlmacen={ubicacionesAlmacen}/>
              )
              :(
                <InfoLotes items={lotesAlmacen} />
              )
            }

            
           
          </div>
        )}
      </div>


   
     
    </div>
  );
}