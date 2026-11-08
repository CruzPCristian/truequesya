import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { publicaciones } from '../data/publicaciones'
import { misProductos } from '../data/misProductos'
import FotoProducto from '../components/FotoProducto'

function DetallePublicacion() {
  const { id } = useParams()
  const publicacion = publicaciones.find((p) => p.id === Number(id))

  const [datos, setDatos] = useState({ producto: '', cantidad: '1', mensaje: '' })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  // Si la dirección tiene un número que no existe
  if (!publicacion) {
    return (
      <section>
        <h1>Publicación no encontrada</h1>
        <p>Esta publicación no existe o ya no está disponible.</p>
        <Link to="/publicaciones">Volver a publicaciones</Link>
      </section>
    )
  }

  const fechaLegible = new Date(publicacion.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setEnviado(false)
  }

  function validar() {
    const nuevos = {}
    const cantidad = Number(datos.cantidad)

    if (!datos.producto) nuevos.producto = 'Elige el producto que ofreces.'

    if (!datos.cantidad) nuevos.cantidad = 'La cantidad es obligatoria.'
    else if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 99) {
      nuevos.cantidad = 'La cantidad debe ser un número entero entre 1 y 99.'
    }

    if (!datos.mensaje.trim()) nuevos.mensaje = 'El mensaje es obligatorio.'
    else if (datos.mensaje.trim().length < 5) nuevos.mensaje = 'El mensaje debe tener al menos 5 caracteres.'

    return nuevos
  }

  function enviar(e) {
    e.preventDefault()
    setEnviado(false)
    const nuevos = validar()
    setErrores(nuevos)

    // Sin errores: simula el envío (aún no hay conexión con servicios)
    if (Object.keys(nuevos).length === 0) {
      setEnviado(true)
      setDatos({ producto: '', cantidad: '1', mensaje: '' })
    }
  }

  return (
    <section>
      <Link to="/publicaciones">← Volver a publicaciones</Link>

      <h1>{publicacion.nombre}</h1>
      <FotoProducto nombre={publicacion.nombre} grande />
      <p>{publicacion.descripcion}</p>
      <p>Ofrece: {publicacion.propietario}</p>
      <p>Publicado el {fechaLegible}</p>

      {misProductos.length === 0 ? (
        <p>
          Para ofertar necesitas tener al menos un producto.{' '}
          <Link to="/mis-productos">Crea tu primer producto</Link>
        </p>
      ) : (
        <form className="formulario" onSubmit={enviar} noValidate>
          <h2>Hacer una oferta</h2>

          <div className="campo">
            <label htmlFor="producto">Producto que ofreces</label>
            <select
              id="producto"
              name="producto"
              value={datos.producto}
              onChange={cambiar}
              aria-invalid={errores.producto ? 'true' : 'false'}
              aria-describedby={errores.producto ? 'error-producto' : undefined}
            >
              <option value="">Selecciona un producto</option>
              {misProductos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
            {errores.producto && (
              <span id="error-producto" className="error" role="alert">
                {errores.producto}
              </span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              min="1"
              max="99"
              value={datos.cantidad}
              onChange={cambiar}
              aria-invalid={errores.cantidad ? 'true' : 'false'}
              aria-describedby={errores.cantidad ? 'error-cantidad' : undefined}
            />
            {errores.cantidad && (
              <span id="error-cantidad" className="error" role="alert">
                {errores.cantidad}
              </span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="4"
              maxLength="300"
              value={datos.mensaje}
              onChange={cambiar}
              aria-invalid={errores.mensaje ? 'true' : 'false'}
              aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
            />
            {errores.mensaje && (
              <span id="error-mensaje" className="error" role="alert">
                {errores.mensaje}
              </span>
            )}
          </div>

          <button type="submit" className="boton">Ofertar</button>

          {enviado && (
            <p className="exito" role="status">
              Tu oferta fue enviada. El dueño de la publicación recibirá un aviso.
            </p>
          )}
        </form>
      )}
    </section>
  )
}

export default DetallePublicacion