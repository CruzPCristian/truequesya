import { useState } from 'react'
import { trueques } from '../data/trueques'

function formatearFecha(fecha) {
  return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Historial() {
  const [filtro, setFiltro] = useState('Todos')

  // Filtra por estado y deja los más recientes primero
  const visibles = trueques
    .filter((t) => filtro === 'Todos' || t.estado === filtro)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))

  return (
    <section>
      <h1>Historial de trueques</h1>

      <div className="filtro">
        <label htmlFor="filtro-estado">Filtrar por estado:</label>
        <select
          id="filtro-estado"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Aceptado">Aceptado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
      </div>

      <p role="status">
        Mostrando {visibles.length} de {trueques.length} trueques.
      </p>

      {visibles.length === 0 ? (
        <p>No hay trueques con ese estado.</p>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla">
            <caption>Tus trueques</caption>
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Publicación</th>
                <th scope="col">Con</th>
                <th scope="col">Producto que ofreciste</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((t) => (
                <tr key={t.id}>
                  <td>{formatearFecha(t.fecha)}</td>
                  <td>{t.publicacion}</td>
                  <td>{t.con}</td>
                  <td>{t.ofrecido}</td>
                  <td>{t.cantidad}</td>
                  <td>
                    <span className={`estado estado-${t.estado.toLowerCase()}`}>
                      {t.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Historial