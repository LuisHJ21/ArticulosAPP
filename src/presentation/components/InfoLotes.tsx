
interface Loteprops
{
    items:{nroLote:string,total:string}[]
}

const InfoLotes = ({items}:Loteprops) => {
  return (
    <table>
       {items.length>0&&(
        items.map((item,index)=>(
            <tr key={index} className="bg-blue-50/30">
            <td colSpan={2} className="px-6 pb-6 pt-2">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in slide-in-from-top-2">
                                           
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                
                        <div  className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-colors">
                            <div className="flex items-center gap-3">
                            
                            <div>
                                <span className="block text-xs font-bold text-slate-700">{item.nroLote??"Sin Especificar"}</span>
                                
                            </div>
                            </div>
                            <span className="text-xs font-bold text-slate-800">{item.total} KG</span>
                        </div>
                        
                    </div>
                </div>
            </td>
         </tr>
        ))


       )}
        
    
    </table>
  )
}

export default InfoLotes