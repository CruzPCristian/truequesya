import { useState } from 'react'
import { fotos } from '../data/fotos'
import './FotoProducto.css'

function FotoProducto({ nombre, foto, grande = false }) {
  const [fallo, setFallo] = useState(false)
  const origen = foto || fotos[nombre]
  const clase = grande ? 'foto-producto foto-grande' : 'foto-producto'

  // Si no hay foto, o no se pudo cargar, muestra un recuadro de relleno
  if (!origen || fallo) {
    return (
      <div className={`${clase} sin-foto`} role="img" aria-label={`Sin foto de ${nombre}`}>
        Sin foto
      </div>
    )
  }

  return (
    <img
      className={clase}
      src={origen}
      alt={`Foto de ${nombre}`}
      onError={() => setFallo(true)}
    />
  )
}

export default FotoProducto