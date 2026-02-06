import React, { useState } from 'react';
import {
  Search,
  ArrowLeft,
  Box,
  Printer,
  MapPin,
  Fish,
  AlignJustify,
  Thermometer,
  Snowflake,
  Tag,
  FileText
} from 'lucide-react';

// --- DATOS MOCK ---
const mockProducts = [
  {
    id: 1,
    code: "101001.0002",
    name: "PERICO ENTERO M/N",
    category: "MATERIA PRIMA",
    subcategory: "CONGELADO - IQF",
    description: "Pescado Perico entero fresco, procesado y congelado bajo estándares IQF.",
    weight: "1 KGR",
    totalStock: 3652.00,
    warehouses: [
      {
        id: "CAM-01",
        name: "CÁMARA 01",
        description: "Almacén MP - Zona Frio",
        temperature: "-20°C",
        quantity: 2000.00,
        layout: { levels: 3, columns: 4 },
        sides: [
          {
            name: "RACK IZQUIERDA",
            type: "L",
            slots: [
              { x: 1, y: 1, pallets: [{ id: "P-101", batch: "ENE-24" }, { id: "P-102", batch: "ENE-24" }] },
              { x: 2, y: 1, pallets: [{ id: "P-103", batch: "ENE-24" }] },
              { x: 1, y: 2, pallets: [{ id: "P-104", batch: "FEB-24" }, { id: "P-104-B", batch: "FEB-24" }] },
              { x: 3, y: 3, pallets: [{ id: "P-105", batch: "MAR-24" }] }
            ]
          },
          {
            name: "RACK DERECHA",
            type: "R",
            slots: [
              { x: 1, y: 1, pallets: [{ id: "P-200", batch: "ENE-24" }, { id: "P-201", batch: "ENE-24" }] },
              { x: 4, y: 1, pallets: [{ id: "P-202", batch: "ENE-24" }] },
              { x: 4, y: 2, pallets: [{ id: "P-203", batch: "FEB-24" }] }
            ]
          }
        ]
      },
      {
        id: "CAM-02",
        name: "CÁMARA 02",
        description: "Almacén MP - Congelado",
        temperature: "-18°C",
        quantity: 1652.00,
        layout: { levels: 4, columns: 5 },
        sides: [
          {
            name: "RACK ÚNICO",
            type: "C",
            slots: [
              { x: 2, y: 2, pallets: [{ id: "P-601", batch: "MAR-24" }, { id: "P-602", batch: "MAR-24" }] },
              { x: 3, y: 1, pallets: [{ id: "P-500", batch: "FEB-24" }] }
            ]
          }
        ]
      },
      {
        id: "CAM-03",
        name: "CÁMARA 03",
        description: "Tránsito",
        temperature: "-5°C",
        quantity: 0.00,
        layout: { levels: 2, columns: 3 },
        sides: []
      }
    ]
  }
];

// --- COMPONENTE: LISTA DE UBICACIONES ---
const RackListView = ({ slots }) => {
  const sortedSlots = [...slots].sort((a, b) => {
    if (a.x === b.x) return a.y - b.y;
    return a.x - b.x;
  });

  return (
    <div className="flex flex-col gap-3 mb-6">
      {sortedSlots.map((slot, idx) => (
        <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-sm">
          {/* Cabecera Ubicación */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white border border-slate-200 p-2 rounded-lg">
                <MapPin size={18} className="text-blue-500" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-700 block">Columna {slot.x} • Nivel {slot.y}</span>
                <span className="text-[10px] text-slate-400 block">Ubicación (Ancho x Alto)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-black text-slate-800">
                {slot.pallets.length} <span className="text-[10px] font-normal text-slate-500">Pallets</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Profundidad</span>
            </div>
          </div>

          {/* Lista de Profundidad */}
          <div className="pl-3 border-l-2 border-slate-200 ml-4 flex flex-col gap-2">
            {slot.pallets.map((pallet, pIdx) => {
              const isJan = pallet.batch.includes("ENE");
              const batchColor = isJan ? "text-blue-700" : "text-green-700";
              const batchBg = isJan ? "bg-blue-50 border-blue-100" : "bg-green-50 border-green-100";

              return (
                <div key={pIdx} className="bg-white p-2.5 rounded-lg border border-slate-100 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center w-6">
                      <span className="text-[9px] font-bold text-slate-300">POS</span>
                      <span className="text-xs font-bold text-slate-500">#{pIdx + 1}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Box size={14} className="text-slate-400" />
                      <span className="text-sm font-black text-slate-700">{pallet.id}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded border ${batchBg}`}>
                    <span className={`text-[10px] font-bold ${batchColor}`}>{pallet.batch}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("CAM-01");

  const filteredProducts = searchTerm.length > 0
    ? mockProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleSelectProduct = (p) => {
    setSelectedProduct(p);
    setSearchTerm("");
    if (p.warehouses.length > 0) setActiveTab(p.warehouses[0].id);
  };

  // --- VISTA HOME ---
  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
        {/* Header Home */}
        <div className="p-5 bg-slate-800 rounded-b-3xl border-b border-slate-700 pb-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">WMS<span className="text-blue-500">VISUAL</span></h1>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Sistema de Gestión</span>
            </div>
            <div className="w-10 h-10 bg-slate-700 rounded-xl flex justify-center items-center border border-slate-600">
              <span className="font-bold text-blue-400">JM</span>
            </div>
          </div>

          <div className="flex items-center bg-slate-900 rounded-2xl border border-slate-700 px-4 h-14 shadow-inner">
            <Search size={20} className="text-slate-500 mr-3" />
            <input
              className="flex-1 bg-transparent text-white text-base outline-none placeholder:text-slate-500"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de Resultados */}
        <div className="p-4 overflow-y-auto flex-1 pb-10">
          {searchTerm !== "" && (
            <div className="flex flex-col gap-3">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-4 cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  <div className="w-12 h-12 bg-slate-700 rounded-xl flex justify-center items-center">
                    <Fish size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{item.name}</h4>
                    <span className="text-xs text-blue-400 font-mono">{item.code}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- VISTA DETALLE ---
  const activeWarehouse = selectedProduct.warehouses.find(w => w.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">

      {/* Header Detalle (Fondo Oscuro) */}
      <div className="bg-slate-900 px-6 pt-6 pb-16 rounded-b-[40px] relative z-10 shadow-2xl">
        {/* Nav Bar */}
        <div className="flex justify-between mb-6">
          <button onClick={() => setSelectedProduct(null)} className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-colors">
            <ArrowLeft size={20} className="text-slate-200" />
          </button>
          <div className="flex gap-2">
            <button className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-colors">
              <Printer size={20} className="text-slate-200" />
            </button>
          </div>
        </div>

        {/* Info Producto */}
        <div className="mb-6">
          <div className="flex items-center self-start bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg mb-3 gap-2 w-max">
            <span className="text-[10px] font-bold text-blue-400 tracking-wider">CÓDIGO</span>
            <span className="text-xs font-bold text-blue-200 font-mono">{selectedProduct.code}</span>
          </div>

          <h1 className="text-2xl font-black text-white mb-2 leading-8">{selectedProduct.name}</h1>
          <p className="text-sm text-slate-400 border-l-2 border-slate-700 pl-3 leading-5">
            {selectedProduct.description}
          </p>
        </div>

        {/* Taxonomía */}
        <div className="flex gap-3">
          <div className="flex-1 bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60 flex items-center gap-3">
            <div className="bg-slate-700 p-1.5 rounded-lg">
              <Tag size={14} className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-[9px] font-bold text-slate-400 uppercase mb-0.5 block">Categoría</span>
              <span className="text-xs font-bold text-slate-200 block truncate">{selectedProduct.category}</span>
            </div>
          </div>

          <div className="flex-1 bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/60 flex items-center gap-3">
            <div className="bg-slate-700 p-1.5 rounded-lg">
              <FileText size={14} className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <span className="text-[9px] font-bold text-slate-400 uppercase mb-0.5 block">Sub-Categoría</span>
              <span className="text-xs font-bold text-slate-200 block truncate">{selectedProduct.subcategory}</span>
            </div>
          </div>
        </div>

        {/* Tarjeta Flotante: STOCK TOTAL GLOBAL (Absolute) */}
        <div className="absolute -bottom-10 left-6 right-6 bg-white p-4 rounded-2xl flex justify-between items-center shadow-lg border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5 block">Stock Total Global</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-800 tracking-tight">{selectedProduct.totalStock.toLocaleString()}</span>
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
          {selectedProduct.warehouses.map(wh => {
            const isActive = activeTab === wh.id;
            return (
              <button
                key={wh.id}
                onClick={() => setActiveTab(wh.id)}
                className={`flex items-center px-4 py-2.5 rounded-xl border gap-2 transition-all whitespace-nowrap ${isActive ? 'bg-slate-800 border-slate-800 shadow-sm' : 'bg-white border-slate-200'
                  }`}
              >
                <Snowflake size={14} className={isActive ? "text-blue-400" : "text-slate-400"} />
                <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                  {wh.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 px-4 pt-4 overflow-y-auto pb-10">
        {!activeWarehouse || activeWarehouse.sides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 opacity-50">
            <MapPin size={48} className="text-slate-300" />
            <span className="mt-2 text-sm text-slate-400">Sin stock en esta cámara</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {/* TARJETA DE STOCK ESPECÍFICO */}
            <div className="bg-white border border-blue-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock en {activeWarehouse.name}</span>
                  <div className="bg-blue-100 flex items-center px-1.5 py-0.5 rounded gap-1">
                    <Thermometer size={10} className="text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-600 font-mono">{activeWarehouse.temperature}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">
                    {activeWarehouse.quantity ? activeWarehouse.quantity.toLocaleString() : '0'}
                  </span>
                  <span className="text-xs font-bold text-slate-500">KGR</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">{activeWarehouse.description}</p>
              </div>

              <div className="w-10 h-10 bg-blue-500 rounded-xl flex justify-center items-center shadow-md shadow-blue-200">
                <Box size={20} className="text-white" />
              </div>
            </div>

            {/* Lista de Racks */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 mt-2">
              {activeWarehouse.sides.map((side, sIdx) => (
                <div key={sIdx}>
                  <div className="flex items-center mb-3 gap-2">
                    <div className="bg-slate-100 p-1.5 rounded-lg">
                      <AlignJustify size={16} className="text-slate-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{side.name}</span>
                  </div>

                  <RackListView slots={side.slots} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}