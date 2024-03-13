import React from 'react'
import IMG1 from '../../assets/not-found/crear-removebg-preview.png'
import { useNavigate } from 'react-router-dom'
import IMG2 from '../../assets/not-found/SearchIMG-Photoroom.png-Photoroom.png'

import IMG3 from '../../assets/not-found/VerPerfilIMG-removebg-preview (1).png'

import IMG4 from '../../assets/not-found/ajustesicono-removebg-preview.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

function BarNav2( {setVisibilityHelp,setVisibilityChat, visibilityChat} ) {
const [visibilityWindowSelect, setVisibilityWindowSelect] = useState(false)
const navigate = useNavigate() 

// funcion visibilidades 

  const functionVisibilityChat = () => {
    setVisibilityChat(!visibilityChat)
    setVisibilityHelp(false)
  }

  // ventana seleccionar objeto a crear

  // visible
  const functionVisibleWindow = () => {
    setVisibilityWindowSelect(true)
  }
  
// no visible

  const functionNoVisibleWindow = () => {
    setVisibilityWindowSelect(false)
  }


// funciones especiales de navegacion

const functionNavigate = (enlace) => {
  navigate(`${enlace}`)
}

const enlacePerfil = '/perfil'
const enlaceBuscar = '/buscar'



  const windowToSelectCreate = () => {
return(
  <div className='window-create-container'>
    <div className='container-button-close'>
      <button className='btn-close' onClick={functionNoVisibleWindow}>X</button>
    </div>

<div className='container-title-select'>
  <h2 style={{color: "black"}}>Seleccione el objeto a crear</h2>
</div>
    

    <div className='container-buttons-select-create'>
      <button className='btn-create'> <NavLink to='/crearServicio'>Crear Servicio</NavLink></button>
      <button className='btn-create'><NavLink to='/crearSolicitud'>Crear Solicitud</NavLink></button>
    </div>
  </div>
)

  }

  return (
    <nav className='barnav2-container'>
      <div className='btn-barnav2-container' onClick={functionVisibleWindow}>
<button className='btn-img-barnav2' ><img src={IMG1} className='img-barnav-2' /></button>
<h2 className="title-barnav2">Añadir</h2>
</div>
<NavLink to='/search'  className='btn-barnav2-container'>
<div className='btn-barnav2-container'>
<button className='btn-img-barnav2'><img src={IMG2} className='img-barnav-2' /></button>
<h2 className="title-barnav2">Buscar</h2>

</div>
</NavLink>
<NavLink to='/perfil'  className='btn-barnav2-container'>
<div className='btn-barnav2-container'>
<button className='btn-img-barnav2'><img src={IMG3} className='img-barnav-2' /></button>
<h2 className="title-barnav2">Perfil</h2>

</div>
</NavLink>
<NavLink to='/settings'  className='btn-barnav2-container'>
<div className='btn-barnav2-container'>
<button className='btn-img-barnav2'><img src={IMG4} className='img-barnav-2' /></button>
<h2 className="title-barnav2">Ajustes</h2>

</div>
</NavLink>

  {visibilityWindowSelect && windowToSelectCreate()} 
    </nav>
  )
}

export default BarNav2