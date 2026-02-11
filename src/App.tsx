
import { ArticuloContextProvider } from './core/contexts/Articulo.context';
import ArticuloView from './presentation/views/ArticuloView';




export default function App() {
  
 return (
  <ArticuloContextProvider>
    <ArticuloView/>
  </ArticuloContextProvider>
 )
}
