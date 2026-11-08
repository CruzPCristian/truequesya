import { Link } from 'react-router-dom'
import './TarjetaAcceso.css'

function TarjetaAcceso({ titulo, descripcion, ruta }) {
  return (
    <Link to={ruta} className="tarjeta-acceso">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </Link>
  )
}

export default TarjetaAcceso