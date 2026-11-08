import { Link } from 'react-router-dom'
import './TarjetaProducto.css'

function TarjetaProducto({ id, nombre, descripcion, propietario, fecha }) {
  const fechaLegible = new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="tarjeta-producto">
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p className="meta">Ofrece: {propietario}</p>
      <p className="meta">Publicado el {fechaLegible}</p>
      <Link
        to={`/publicaciones/${id}`}
        className="boton-enlace"
        aria-label={`Ver y ofertar: ${nombre}`}
      >
        Ver y ofertar
      </Link>
    </article>
  )
}

export default TarjetaProducto