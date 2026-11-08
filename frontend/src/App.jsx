import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Registro from './pages/Registro'
import Bienvenida from './pages/Bienvenida'
import Publicaciones from './pages/Publicaciones'
import DetallePublicacion from './pages/DetallePublicacion'
import MisProductos from './pages/MisProductos'
import Notificaciones from './pages/Notificaciones'
import Historial from './pages/Historial'
import Moderacion from './pages/Moderacion'
import DetalleModeracion from './pages/DetalleModeracion'
import ErrorPage from './pages/ErrorPage'
import OfertasRecibidas from './pages/OfertasRecibidas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registro />} />

      <Route element={<Layout />}>
        <Route path="/inicio" element={<Bienvenida />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/publicaciones/:id" element={<DetallePublicacion />} />
        <Route path="/mis-productos" element={<MisProductos />} />
        <Route path="/ofertas" element={<OfertasRecibidas />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/moderacion" element={<Moderacion />} />
        <Route path="/moderacion/:id" element={<DetalleModeracion />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App