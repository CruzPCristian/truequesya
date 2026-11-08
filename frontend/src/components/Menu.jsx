import { Link, NavLink } from 'react-router-dom'
import './Menu.css'

// Temporal: más adelante dependerá del rol del usuario
const esModerador = true

function Menu() {
  return (
    <header className="encabezado">
      <Link to="/inicio" className="logo">TruequesYa</Link>
      <nav aria-label="Menú principal">
        <NavLink to="/inicio">Inicio</NavLink>
        <NavLink to="/publicaciones">Publicaciones</NavLink>
        <NavLink to="/mis-productos">Mis productos</NavLink>
        <NavLink to="/ofertas">Ofertas</NavLink>
        <NavLink to="/notificaciones">Notificaciones</NavLink>
        <NavLink to="/historial">Historial</NavLink>
        {esModerador && <NavLink to="/moderacion">Moderación</NavLink>}
        <Link to="/" className="cerrar-sesion">Cerrar sesión</Link>
      </nav>
    </header>
  )
}

export default Menu