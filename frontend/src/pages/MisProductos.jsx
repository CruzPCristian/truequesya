import { useState } from 'react'
import { misProductos } from '../data/misProductos'
import FotoProducto from '../components/FotoProducto'

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png']
const TAMANO_MAXIMO = 2 * 1024 * 1024 // 2 MB

function MisProductos() {
  const [productos, setProductos] = useState(misProductos)
  const [datos, setDatos] = useState({ nombre: '', descripcion: '' })
  const [archivo, setArchivo] = useState(null)
  const [vistaPrevia, setVistaPrevia] = useState('')
  const [claveFoto, setClaveFoto] = useState(0)
  const [errores, setErrores] = useState({})
  const [aviso, setAviso] = useState('')

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function cambiarFoto(e) {
    const elegido = e.target.files[0] || null
    setArchivo(elegido)

    // Vista previa solo si es una imagen del tipo permitido
    if (elegido && TIPOS_PERMITIDOS.includes(elegido.type)) {
      setVistaPrevia(URL.createObjectURL(elegido))
    } else {
      setVistaPrevia('')
    }
  }

  function validar() {
    const nuevos = {}

    if (!datos.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.'
    else if (datos.nombre.trim().length < 3) nuevos.nombre = 'El nombre debe tener al menos 3 caracteres.'

    if (!datos.descripcion.trim()) nuevos.descripcion = 'La descripción es obligatoria.'
    else if (datos.descripcion.trim().length < 10) nuevos.descripcion = 'La descripción debe tener al menos 10 caracteres.'

    if (!archivo) nuevos.foto = 'La foto es obligatoria.'
    else if (!TIPOS_PERMITIDOS.includes(archivo.type)) nuevos.foto = 'La foto debe ser jpg o png.'
    else if (archivo.size > TAMANO_MAXIMO) nuevos.foto = 'La foto pesa más de 2 MB. Elige una más liviana.'

    return nuevos
  }

  function crear(e) {
    e.preventDefault()
    setAviso('')
    const nuevos = validar()
    setErrores(nuevos)

    // Sin errores: agrega el producto al principio de la lista (aún sin publicar)
    if (Object.keys(nuevos).length === 0) {
      const nuevo = {
        id: Date.now(),
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion.trim(),
        foto: vistaPrevia,
        publicado: false,
      }
      setProductos([nuevo, ...productos])
      setDatos({ nombre: '', descripcion: '' })
      setArchivo(null)
      setVistaPrevia('')
      setClaveFoto(claveFoto + 1) // vacía el campo de la foto
      setAviso(`Producto "${nuevo.nombre}" creado. Todavía no es público: publícalo cuando quieras.`)
    }
  }

  function publicar(id) {
    const producto = productos.find((p) => p.id === id)
    setProductos(productos.map((p) => (p.id === id ? { ...p, publicado: true } : p)))
    setAviso(`"${producto.nombre}" ya está publicado.`)
  }

  return (
    <section>
      <h1>Mis productos</h1>
      <p>Crea tus productos y publícalos cuando quieras ofrecerlos en trueque.</p>

      <form className="formulario" onSubmit={crear} noValidate>
        <h2>Crear producto</h2>

        <div className="campo">
          <label htmlFor="foto">Foto del producto</label>
          <input
            key={claveFoto}
            id="foto"
            type="file"
            accept="image/jpeg,image/png"
            onChange={cambiarFoto}
            aria-invalid={errores.foto ? 'true' : 'false'}
            aria-describedby={errores.foto ? 'ayuda-foto error-foto' : 'ayuda-foto'}
          />
          <span id="ayuda-foto" className="ayuda">
            Formato jpg o png, máximo 2 MB.
          </span>
          {errores.foto && (
            <span id="error-foto" className="error" role="alert">
              {errores.foto}
            </span>
          )}
          {vistaPrevia && (
            <div className="vista-previa">
              <FotoProducto nombre={datos.nombre.trim() || 'producto nuevo'} foto={vistaPrevia} />
            </div>
          )}
        </div>

        <div className="campo">
          <label htmlFor="nombre">Nombre del producto o servicio</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            maxLength="60"
            value={datos.nombre}
            onChange={cambiar}
            aria-invalid={errores.nombre ? 'true' : 'false'}
            aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          />
          {errores.nombre && (
            <span id="error-nombre" className="error" role="alert">
              {errores.nombre}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="descripcion">Descripción de tu oferta</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            maxLength="300"
            value={datos.descripcion}
            onChange={cambiar}
            aria-invalid={errores.descripcion ? 'true' : 'false'}
            aria-describedby={errores.descripcion ? 'error-descripcion' : undefined}
          />
          {errores.descripcion && (
            <span id="error-descripcion" className="error" role="alert">
              {errores.descripcion}
            </span>
          )}
        </div>

        <button type="submit" className="boton">Crear producto</button>
      </form>

      {aviso && (
        <p className="exito" role="status">
          {aviso}
        </p>
      )}

      <h2>Tus productos</h2>
      {productos.length === 0 ? (
        <p>Todavía no tienes productos. Crea el primero con el formulario.</p>
      ) : (
        <ul className="lista-productos">
          {productos.map((p) => (
            <li key={p.id} className="producto-item">
              <div className="producto-datos">
                <div className="miniatura">
                  <FotoProducto nombre={p.nombre} foto={p.foto} />
                </div>
                <div>
                  <h3>{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                </div>
              </div>
              {p.publicado ? (
                <span className="insignia">Publicado</span>
              ) : (
                <button
                  type="button"
                  className="boton"
                  onClick={() => publicar(p.id)}
                  aria-label={`Publicar ${p.nombre}`}
                >
                  Publicar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default MisProductos