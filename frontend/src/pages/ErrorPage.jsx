import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="pagina-form">
      <div className="tarjeta">
        <h1>Página no encontrada</h1>
        <p>La dirección que escribiste no existe o la página ya no está disponible.</p>
        <p className="enlace-secundario">
          <Link to="/">Volver al inicio</Link>
        </p>
      </div>
    </div>
  )
}

export default ErrorPage