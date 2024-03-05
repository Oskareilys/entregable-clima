import React from 'react'



const Denied = () => {

  return (
    <div>
    <h1 style={{color: 'white', background:'rgba(28, 68, 48, 0.651)'}}> No se pudo obtener el clima debido a la falta de permisos de ubicación.</h1>
    <h2 style={{color: 'white', background:'rgba(28, 68, 48, 0.651)', textAlign: 'center'}}>
    Ingresa una locacion para obtener su clima</h2>

    </div>
  )
}

export default Denied