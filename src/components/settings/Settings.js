import React from 'react'
import { NavLink } from 'react-router-dom'

function Settings() {
  return (
    <div>
      <div className='settings-container'>

<NavLink to='/publicaciones'>
<div className='setting-container'>
  <button className='setting'>Publicaciones</button>
</div>
</NavLink>

<NavLink  to='/editarPerfil'>
<div className='setting-container'>
  <button className='setting'>Editar Perfil</button>
</div>
</NavLink>

<NavLink to='/addresena'>
<div className='setting-container'>
  <button className='setting'>Dejar Una Reseña</button>
</div>
</NavLink>

<div className='setting-container'>
  <button className='setting'>Eliminar Cuenta</button>
</div>

      </div>
    </div>
  )
}

export default Settings