import { useEffect, useRef, useState } from 'react'
import { ArticuloService } from '../../core/services/articulo.service';
import { QrCode, Search, X } from 'lucide-react';
import type { Articulos } from '../../infraestructure/interfaces';
import { Card } from './Card';

export const Buscardor = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [debounceTerm, setDebounceTerm] = useState("");
    const [articulos, setArticulos] = useState<Articulos[]>([]);

    const [isQrActive, setIsQrActive] = useState(false);

    const searchInputRef = useRef<HTMLInputElement|null>(null);


    const handleQrClick = () => {
        setIsQrActive(!isQrActive);
    }


    const cancelSearch = () => {
        setSearchTerm("");
        setDebounceTerm("");
        setArticulos([]);
    }

    const searchProducts = async (term: string) => {
        try {
        const data = await ArticuloService.getArticulos(term);
        setArticulos(data)
        } catch (error) {

        }
    };

    useEffect(() => {

        const timer = setTimeout(() => {
        setDebounceTerm(searchTerm);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (debounceTerm.trim() === "") 
            {
                setArticulos([]);
                return;
            }

        console.log("Buscando:", debounceTerm);

        searchProducts(debounceTerm)
    }, [debounceTerm]);

    useEffect(() => {
        if (isQrActive) {
          searchInputRef.current?.focus()
            setSearchTerm("");
            setDebounceTerm("");
            setArticulos([]);
        }
    }, [isQrActive]);

  return (
      <div className="h-screen bg-slate-900 font-sans flex flex-col">
        {/* BUSCADOR */}
        <div className="p-5 bg-slate-800 rounded-b-3xl border-b border-slate-700 pb-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">INVENTARIO<span className="text-blue-500">APP</span></h1>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Sistema de Gestión de Almacén</span>
            </div>
            
          </div>

          <div className="flex items-center bg-slate-900 rounded-2xl border border-slate-700 px-4 h-14 shadow-inner">
            <Search size={20} className="text-slate-500 mr-3" />
            <input
              ref={searchInputRef}
              className="flex-1 bg-transparent text-white text-base outline-none placeholder:text-slate-500"
              placeholder="Buscar por descripción o código"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={isQrActive?11:600}

              onBlur={()=>
                isQrActive&& searchInputRef.current?.focus()
              }
            />
            {
              searchTerm.length>0&&(<X size={20} className="text-slate-500 mr-3" onClick={cancelSearch}/>)
            }
             <button onClick={handleQrClick}> <QrCode size={28} className={isQrActive?"text-blue-500 mr-3":"text-slate-500 mr-3"} /></button>
          </div>
          
           
          
        </div>

        {/* Lista de Resultados */}
        <div className="p-4 overflow-y-auto flex-1 pb-10">
          {searchTerm !== "" && (
            <div className="flex flex-col gap-3">
              {articulos.map((articulo) => (
                <Card key={articulo.codigo} item={articulo} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
}
