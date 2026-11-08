import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Inicio() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState({})

  function validar() {
    const nuevos = {}

    if (!correo.trim()) {
      nuevos.correo = 'El correo es obligatorio.'
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) {
      nuevos.correo = 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
    }

    if (!contrasena) {
      nuevos.contrasena = 'La contraseña es obligatoria.'
    } else if (contrasena.length < 6) {
      nuevos.contrasena = 'La contraseña debe tener al menos 6 caracteres.'
    }

    return nuevos
  }

  function enviar(e) {
    e.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)

    // Sin errores: pasa a Bienvenida (aún no hay conexión con servicios)
    if (Object.keys(nuevos).length === 0) {
      navigate('/inicio')
    }
  }

  return (
    <div className="pagina-form">
      <div className="tarjeta">
        <h1>TruequesYa</h1>
        <form onSubmit={enviar} noValidate>
          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-invalid={errores.correo ? 'true' : 'false'}
              aria-describedby="error-correo"
            />
            {errores.correo && (
              <span id="error-correo" className="error" role="alert">
                {errores.correo}
              </span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              aria-invalid={errores.contrasena ? 'true' : 'false'}
              aria-describedby="error-contrasena"
            />
            {errores.contrasena && (
              <span id="error-contrasena" className="error" role="alert">
                {errores.contrasena}
              </span>
            )}
          </div>

          <button type="submit" className="boton">Continuar</button>
        </form>

        <p className="enlace-secundario">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default Inicio