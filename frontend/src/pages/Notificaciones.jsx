import { useState } from 'react'
import { notificaciones as datosIniciales } from '../data/notificaciones'

function Notificaciones() {
  const [lista, setLista] = useState(datosIniciales)
  const sinLeer = lista.filter((n) => !n.leido).length

  function marcarLeida(id) {
    setLista(lista.map((n) => (n.id === id ? { ...n, leido: true } : n)))
  }

  function marcarTodas() {
    setLista(lista.map((n) => ({ ...n, leido: true })))
  }

  let resumen = `Tienes ${sinLeer} notificaciones sin leer.`
  if (sinLeer === 0) resumen = 'No tienes notificaciones sin leer.'
  if (sinLeer === 1) resumen = 'Tienes 1 notificación sin leer.'

  return (
    <section>
      <h1>Notificaciones</h1>
      <p role="status">{resumen}</p>

      <div className="acciones">
        <button
          type="button"
          className="boton"
          onClick={marcarTodas}
          disabled={sinLeer === 0}
        >
          Marcar todas como leídas
        </button>
      </div>

      {lista.length === 0 ? (
        <p>No tienes notificaciones por ahora.</p>
      ) : (
        <ul className="lista-notificaciones">
          {lista.map((n) => (
            <li key={n.id} className={n.leido ? 'notificacion' : 'notificacion nueva'}>
              <div>
                {!n.leido && <span className="insignia">Nueva</span>}
                <p>{n.mensaje}</p>
              </div>
              {!n.leido && (
                <button
                  type="button"
                  className="boton"
                  onClick={() => marcarLeida(n.id)}
                  aria-label={`Marcar como leída: ${n.mensaje}`}
                >
                  Marcar como leída
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Notificaciones