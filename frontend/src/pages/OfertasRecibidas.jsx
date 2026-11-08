import { useState } from 'react'
import { ofertasRecibidas } from '../data/ofertas'
import FotoProducto from '../components/FotoProducto'

function formatearFecha(fecha) {
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function OfertasRecibidas() {
  const [ofertas, setOfertas] = useState(ofertasRecibidas)
  const [aviso, setAviso] = useState('')
  const pendientes = ofertas.filter((o) => o.estado === 'Pendiente').length

  function responder(id, nuevoEstado) {
    const oferta = ofertas.find((o) => o.id === id)
    setOfertas(ofertas.map((o) => (o.id === id ? { ...o, estado: nuevoEstado } : o)))
    setAviso(
      nuevoEstado === 'Aceptado'
        ? `Aceptaste la oferta de ${oferta.de} por "${oferta.publicacion}".`
        : `Rechazaste la oferta de ${oferta.de} por "${oferta.publicacion}".`
    )
  }

  return (
    <section>
      <h1>Ofertas recibidas</h1>
      <p role="status">
        {pendientes === 0
          ? 'No tienes ofertas pendientes.'
          : pendientes === 1
          ? 'Tienes 1 oferta pendiente.'
          : `Tienes ${pendientes} ofertas pendientes.`}
      </p>

      {aviso && (
        <p className="exito" role="status">
          {aviso}
        </p>
      )}

      <h2>Tus ofertas</h2>
      {ofertas.length === 0 ? (
        <p>Todavía no has recibido ofertas.</p>
      ) : (
        <ul className="lista-productos">
          {ofertas.map((o) => (
            <li key={o.id} className="producto-item">
              <div className="producto-datos">
                <div className="miniatura">
                  <FotoProducto nombre={o.ofrecido} />
                </div>
                <div>
                  <h3>Oferta por "{o.publicacion}"</h3>
                  <p>De: {o.de}</p>
                  <p>Ofrece: {o.cantidad} × {o.ofrecido}</p>
                  <p>"{o.mensaje}"</p>
                  <p>Recibida el {formatearFecha(o.fecha)}</p>
                </div>
              </div>

              {o.estado === 'Pendiente' ? (
                <div className="acciones-moderacion">
                  <button
                    type="button"
                    className="boton"
                    onClick={() => responder(o.id, 'Aceptado')}
                    aria-label={`Aceptar la oferta de ${o.de}`}
                  >
                    Aceptar
                  </button>
                  <button
                    type="button"
                    className="boton boton-rechazo"
                    onClick={() => responder(o.id, 'Rechazado')}
                    aria-label={`Rechazar la oferta de ${o.de}`}
                  >
                    Rechazar
                  </button>
                </div>
              ) : (
                <span className={`estado estado-${o.estado.toLowerCase()}`}>
                  {o.estado}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OfertasRecibidas