import TarjetaAcceso from '../components/TarjetaAcceso'

// Dato de ejemplo: más adelante vendrá del usuario que inició sesión
const nombreUsuario = 'Cosme Fulanito'

function Bienvenida() {
  return (
    <section>
      <h1>Bienvenid@, {nombreUsuario}</h1>
      <p>¿Qué quieres hacer hoy?</p>

      <div className="accesos">
        <TarjetaAcceso
          titulo="Explorar publicaciones"
          descripcion="Mira lo que otras personas ofrecen para intercambiar."
          ruta="/publicaciones"
        />
        <TarjetaAcceso
          titulo="Mis productos"
          descripcion="Crea tus productos y publícalos para hacer trueques."
          ruta="/mis-productos"
        />
        <TarjetaAcceso
          titulo="Mis trueques"
          descripcion="Revisa el historial de tus trueques."
          ruta="/historial"
        />
      </div>
    </section>
  )
}

export default Bienvenida