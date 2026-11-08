import TarjetaProducto from '../components/TarjetaProducto'
import { publicaciones } from '../data/publicaciones'

function Publicaciones() {
  // Las más recientes primero
  const ordenadas = [...publicaciones].sort((a, b) => b.fecha.localeCompare(a.fecha))

  return (
    <section>
      <h1>Publicaciones</h1>
      <p>Productos y servicios que otras personas ofrecen para intercambiar.</p>

      {ordenadas.length === 0 ? (
        <p>No hay publicaciones disponibles por ahora.</p>
      ) : (
        <div className="rejilla">
          {ordenadas.map((p) => (
            <TarjetaProducto
              key={p.id}
              id={p.id}
              nombre={p.nombre}
              descripcion={p.descripcion}
              propietario={p.propietario}
              fecha={p.fecha}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Publicaciones