import { Link } from 'react-router-dom'
import { pendientes } from '../data/moderacion'

function formatearFecha(fecha) {
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function Moderacion() {
  const total = pendientes.length

  return (
    <section>
      <h1>Bandeja de moderación</h1>
      <p role="status">
        {total === 0
          ? 'No hay publicaciones por revisar.'
          : total === 1
          ? 'Tienes 1 publicación por revisar.'
          : `Tienes ${total} publicaciones por revisar.`}
      </p>

      <ul className="lista-productos">
        {pendientes.map((p) => (
          <li key={p.id} className="producto-item">
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '1.2rem', color: '#2e7d32' }}>{p.nombre}</h2>
              <p>Ofrece: {p.propietario}</p>
              <p>Publicado el {formatearFecha(p.fecha)}</p>
            </div>
            <Link
              to={`/moderacion/${p.id}`}
              className="boton-enlace"
              aria-label={`Revisar: ${p.nombre}`}
            >
              Revisar
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Moderacion