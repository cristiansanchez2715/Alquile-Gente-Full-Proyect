import React, { useState } from 'react'
import imgBarNav from '../../assets/not-found/logo-removebg-preview.png'
import imgBuscar from '../../assets/not-found/logo-removebg-preview.png'

function Buscar({personasDePrueba}) {
const [challangeInput, setChallangeInput] = useState("")
const [resultSearch, setResultSearch] = useState()
const [visibilityResults, setVisibilityResults] = useState(false)

const challangeFunction = (e) => {
setChallangeInput(e.target.value)
setVisibilityResults(false)
}

const searchFunction = () => {
const search = personasDePrueba.filter((persona) => {
return persona.nombre.replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(challangeInput)
})
setResultSearch(search)
setVisibilityResults(true)
}


  return (
    <div>
    <div className='container-buscar'>
  <div  className='logo-container2' id='logo-form' style={{display: "flex", flexDirection: "row", marginLeft: "150px"}}>
  <h2><span style={{color: "red"}}>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
    <img src={imgBarNav} className='img-barnav' />
</div>
        <div className='container-input-buscar'>

      
            
            <input onChange={challangeFunction} className='input-buscar' type='text' placeholder='Search' />
            <button onClick={searchFunction} className='btn-buscar'><img  className='img-btn-buscar' src={imgBuscar} /></button>
        </div>

</div>


{!visibilityResults &&
        <div className="grid-container">

</div>
}


{ visibilityResults &&
<div className="grid-container">
  {resultSearch.map((persona, index) => (
    <div key={index} className="card-persona-search" >
      <h1>{persona.nombre}</h1>
      <h1>{persona.apellido}</h1>
      <p>{persona.descripcion}</p>
      <p>{persona.ciudad}</p>
      <p>{persona.edad} años</p>
    </div>
  ))}
</div>
}
    </div>
  )
}

export default Buscar