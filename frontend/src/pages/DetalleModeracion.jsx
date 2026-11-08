import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { pendientes } from '../data/moderacion'
import FotoProducto from '../components/FotoProducto'

function DetalleModeracion() {
  const { id } = useParams()
  const publicacion = pendientes.find((p) => p.id === Number(id))

  const [rechazando, setRechazando] = useState(false)
  const [motivo, setMotivo] = useState('')
  const [errorMotivo, setErrorMotivo] = useState('')
  const [resultado, setResultado] = useState('')

  if (!publicacion) {
    return (
      <section>
        <h1>Publicación no encontrada</h1>
        <p>Esta publicación no existe o ya fue revisada.</p>
        <Link to="/moderacion">Volver a la bandeja</Link>
      </section>
    )
  }

  const fechaLegible = new Date(publicacion.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  function aprobar() {
    setResultado(`La publicación "${publicacion.nombre}" fue aprobada.`)
  }

  function cancelarRechazo() {
    setRechazando(false)
    setMotivo('')
    setErrorMotivo('')
  }

  function confirmarRechazo(e) {
    e.preventDefault()
    if (motivo.trim().length < 5) {
      setErrorMotivo('Escribe el motivo del rechazo (mínimo 5 caracteres).')
      return
    }
    setErrorMotivo('')
    setResultado(`La publicación "${publicacion.nombre}" fue rechazada. Motivo: ${motivo.trim()}`)
  }

  return (
    <section>
      <Link to="/moderacion">← Volver a la bandeja</Link>

      <h1>{publicacion.nombre}</h1>
      <FotoProducto nombre={publicacion.nombre} grande />
      <p>{publicacion.descripcion}</p>
      <p>Ofrece: {publicacion.propietario}</p>
      <p>Publicado el {fechaLegible}</p>

      {resultado ? (
        <>
          <p className="exito" role="status">{resultado}</p>
          <Link to="/moderacion">Volver a la bandeja</Link>
        </>
      ) : (
        <>
          <div className="acciones-moderacion">
            <button type="button" className="boton" onClick={aprobar}>
              Aprobar
            </button>
            <button
              type="button"
              className="boton boton-rechazo"
              onClick={() => setRechazando(true)}
            >
              Rechazar
            </button>
          </div>

          {rechazando && (
            <form className="formulario" onSubmit={confirmarRechazo} noValidate>
              <h2>Motivo del rechazo</h2>
              <div className="campo">
                <label htmlFor="motivo">Explica por qué se rechaza</label>
                <textarea
                  id="motivo"
                  rows="4"
                  maxLength="300"
                  autoFocus
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  aria-invalid={errorMotivo ? 'true' : 'false'}
                  aria-describedby={errorMotivo ? 'error-motivo' : undefined}
                />
                {errorMotivo && (
                  <span id="error-motivo" className="error" role="alert">
                    {errorMotivo}
                  </span>
                )}
              </div>
              <div className="acciones-moderacion">
                <button type="submit" className="boton boton-rechazo">
                  Confirmar rechazo
                </button>
                <button type="button" className="boton" onClick={cancelarRechazo}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </section>
  )
}

export default DetalleModeracion