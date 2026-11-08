import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Cada campo del formulario: lo que se muestra y cómo se comporta
const campos = [
  { name: 'nombre', label: 'Nombre', type: 'text', autoComplete: 'given-name', maxLength: 50 },
  { name: 'apellido', label: 'Apellido', type: 'text', autoComplete: 'family-name', maxLength: 50 },
  { name: 'correo', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
  { name: 'documento', label: 'Documento', type: 'text', inputMode: 'numeric', maxLength: 10 },
  { name: 'telefono', label: 'Teléfono', type: 'tel', inputMode: 'numeric', autoComplete: 'tel', maxLength: 10 },
  { name: 'contrasena', label: 'Contraseña', type: 'password', autoComplete: 'new-password' },
]

function validar(datos) {
  const nuevos = {}

  if (!datos.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.'
  else if (datos.nombre.trim().length < 2) nuevos.nombre = 'El nombre debe tener al menos 2 caracteres.'

  if (!datos.apellido.trim()) nuevos.apellido = 'El apellido es obligatorio.'
  else if (datos.apellido.trim().length < 2) nuevos.apellido = 'El apellido debe tener al menos 2 caracteres.'

  if (!datos.correo.trim()) nuevos.correo = 'El correo es obligatorio.'
  else if (!/^\S+@\S+\.\S+$/.test(datos.correo)) nuevos.correo = 'Escribe un correo válido, por ejemplo nombre@dominio.com.'

  if (!datos.documento) nuevos.documento = 'El documento es obligatorio.'
  else if (!/^\d{6,10}$/.test(datos.documento)) nuevos.documento = 'El documento debe tener entre 6 y 10 números, sin puntos ni espacios.'

  if (!datos.telefono) nuevos.telefono = 'El teléfono es obligatorio.'
  else if (!/^\d{10}$/.test(datos.telefono)) nuevos.telefono = 'El teléfono debe tener exactamente 10 números.'

  if (!datos.contrasena) nuevos.contrasena = 'La contraseña es obligatoria.'
  else if (datos.contrasena.length < 6) nuevos.contrasena = 'La contraseña debe tener al menos 6 caracteres.'

  return nuevos
}

function Registro() {
  const navigate = useNavigate()
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    documento: '',
    telefono: '',
    contrasena: '',
  })
  const [errores, setErrores] = useState({})

  // Un solo manejador para todos los campos: usa el "name" del input
  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const nuevos = validar(datos)
    setErrores(nuevos)

    // Sin errores: vuelve al inicio de sesión (aún no hay conexión con servicios)
    if (Object.keys(nuevos).length === 0) {
      navigate('/')
    }
  }

  return (
    <div className="pagina-form">
      <div className="tarjeta">
        <h1>Crear cuenta</h1>
        <form onSubmit={enviar} noValidate>
          {campos.map((c) => (
            <div className="campo" key={c.name}>
              <label htmlFor={c.name}>{c.label}</label>
              <input
                id={c.name}
                name={c.name}
                type={c.type}
                inputMode={c.inputMode}
                autoComplete={c.autoComplete}
                maxLength={c.maxLength}
                value={datos[c.name]}
                onChange={cambiar}
                aria-invalid={errores[c.name] ? 'true' : 'false'}
                aria-describedby={errores[c.name] ? `error-${c.name}` : undefined}
              />
              {errores[c.name] && (
                <span id={`error-${c.name}`} className="error" role="alert">
                  {errores[c.name]}
                </span>
              )}
            </div>
          ))}

          <button type="submit" className="boton">Registrarme</button>
        </form>

        <p className="enlace-secundario">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro