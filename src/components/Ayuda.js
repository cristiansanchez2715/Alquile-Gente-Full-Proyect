import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Ayuda() {
// visibilidades
    const [visibilidad1, setVisibilidad1] = useState(true)
    
    const [visibilidad2, setVisibilidad2] = useState(false)
    
    const [visibilidad3, setVisibilidad3] = useState(false)


// funciones visibilidad

const functionVisibilidad1 = () => {
    setVisibilidad1(true)
    setVisibilidad2(false)
    setVisibilidad3(false)
}

const functionVisibilidad2 = () => {
    setVisibilidad1(false)
    setVisibilidad2(true)
    setVisibilidad3(false)
}

const functionVisibilidad3 = () => {
    setVisibilidad1(false)
    setVisibilidad2(false)
    setVisibilidad3(true)
}


    // RETORNOS DE INFORMACION

const informacion1 = () => {

return(
    <div>
        
<span style={{fontWeight: "bold"}} className='subtitle-quees'>¿COMO FUNCIONA?</span>
<p  className='parrafo-quees2'>
En nuestra página GRATUITA de búsqueda de amigos, simplemente ingresa la ubicación donde buscas un amigo y verás instantáneamente una selección de acompañantes disponibles, sus perfiles, intereses y fotografías.

Si deseas comunicarte con un amigo, debes registrarte para convertirte en miembro por una pequeña tarifa y recibirás acceso inmediato a todos los amigos en Alquile Gente.</p>

<div>
    <button className='item-barnav-button' onClick={functionVisibilidad2}>Siguiente</button>
</div>

    </div>
)

}

const informacion2 = () => {
    return(
        <div>
<span style={{fontWeight: "bold"}} className='subtitle-quees'>¿Cuanto cuesta alquilar un amigo?</span>
<p className='parrafo-quees2'>Muchos amigos están disponibles desde tan solo 10 dólares la hora. Algunos pueden cobrar más si poseen habilidades especiales o pueden ofrecer consejos expertos que puedan beneficiarte.

Incluso es posible que algunos amigos renuncien a su tarifa si consideran que el valor de la actividad en la que participarán compensa con creces (por ejemplo, ver un programa de éxito). Todo es negociable</p>


<div>
    <button className='item-barnav-button' onClick={functionVisibilidad1}>Atras</button>
    <button className='item-barnav-button' onClick={functionVisibilidad3}>Siguiente</button>
</div>

        </div>
    )
}


const informacion3 = () => {
return(
    <div className='information-3'>
<span style={{fontWeight: "bold"}} className='subtitle-quees'>¿Por qué usar Alquile Gente en lugar de otra plataforma?</span>
<p className='parrafo-quees2'>Aunque existen numerosos sitios de citas, muchas personas no buscan ese tipo de relación. Simplemente desean una compañía puramente platónica.

Es el momento de probar Alquile Gente. ¿Por qué privarte de experiencias divertidas y enriquecedoras que pueden mejorar tu vida? Encuentra a tu amigo o servicio ahora:</p>

    <div className='container-buttons-quees'>
      {/* <button className='btn-quees' id='find-friend'><h3><NavLink to='/'>HAGA CLICK AQUI PARA ENCONTRAR UN AMIGO</NavLink></h3></button> */}
      {/* <button className='btn-quees' id='unete-btn'><h3>UNETE AHORA</h3></button> */}
</div>

<div>
    <button id='information3button' className='item-barnav-button' onClick={functionVisibilidad2}>Atras</button>
</div>
    </div>
)
}
// RETURN GENERAL APP

  return (
    <div className='container-help'>
{visibilidad1 && informacion1()}

{visibilidad2 && informacion2()}

{visibilidad3 && informacion3()}
</div>
    
  )
}

export default Ayuda