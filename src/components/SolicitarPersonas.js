import React from 'react'
import { useState } from 'react'

function SolicitarPersonas({solicitudesDisponibles}) {
    const [recargarMapeo, setRecargarMapeo] = useState(true)
    const [visibilitySearch, setVisibilitySearch] = useState(false)
    const [recargarMapeo1, setRecargarMapeo1] = useState(false)
    const [solicitudesSearch, setSolicitudesSearch] = useState()
    const [challangeForm, setChallangeForm] = useState()
    const [visibilitySolicitudesWhatssap, setVisibilitySolicitudesWhatssap] = useState(false)
    const [visibilityId, setVisibilityId] = useState(null)
    const [visibilitySolicitudesDisponibles, setVisibilitySolicitudesDisponibles] = useState(true)
    

// MAPEO SOLICITUDES


const functionVisibilityWhatssapSolicitudes = (id) => {
    setVisibilitySolicitudesWhatssap(!visibilitySolicitudesWhatssap)
    setVisibilityId(id)
  }
  
  const mapeoSolicitudes = () => {
    return(
      <div className="container-servicios">
    {
      solicitudesDisponibles.map((servicio, index) => {
        return (
          <div key={index} className="card-servicio">
            <h1>Nombre: {servicio.nombrePersona}</h1>
            <img className='img-servicio' style={{width: "100px", height: "100px", borderRadius: "50%"}} src={`http://localhost:4000/public/uploads/${servicio.imagen}`} />
            <h2 id='ubicacion-service'>Ubicacion:
    <br></br>{servicio.ubicacion}</h2>
            <h2>Se Solicita: {servicio.tipoAcompaniamiento}</h2>
            <p>Descripcion: {servicio.descripcion}</p>
            <h2><span style={{color: "red"}}> PRECIO: {servicio.precio}</span></h2>
            <h2>Dias Disponibles: {servicio.diasDisponibles}</h2> 
            <h3>Horas Preferidas: {servicio.horasPreferidas}</h3>
            <h3>Horas diarias: {servicio.horasDiarias}</h3>   
            {/* <h4>Numero: {servicio.whatssap}</h4> */}
            <button className='btn-contratar' onClick={() => functionVisibilityWhatssapSolicitudes(servicio.id)}>Contratar</button>
  <div>
  {visibilitySolicitudesWhatssap && visibilityId === servicio.id && <a target='_blank' href={`https://wa.me/${servicio.whatssap.replace("+" , "")}`} className='whatssap-button'>Whatssap</a>}
  </div>
  
          </div>
        );
      })
    }
  </div>
  
    )
  }
  


// logica busqueda por ubicacion


const challangeInput = (e) => {
    setChallangeForm(e.target.value)
    setVisibilitySearch(false)
    setVisibilitySolicitudesDisponibles(true)
  }
  
  
  const searchSolicitudesForUbication = () => {
  const search = solicitudesDisponibles.filter((services) => {
   return services.ubicacion.toLowerCase().includes(challangeForm)
  })
    setSolicitudesSearch(search)
    setVisibilitySearch(true)
    setVisibilitySolicitudesDisponibles(false)
  }
  
  // mapeando busqueda
  
  const searchMap = () => {
  
    
  return(
    <div className='container-servicios'>
      {
  solicitudesSearch.map((service, index) => {
    return(
      <div className='card-servicio'  key={index} style={{border: "solid black 1px"}}>
  <h1>Nombre: {service.nombrePersona}</h1>
  <h2>Ubicacion: {service.ubicacion}</h2>
            <h2>Tipo de Acompañamiento: {service.tipoAcompaniamiento}</h2>
            <p>Descripcion: {service.descripcion}</p>
            <h2>Precio: {service.precio}</h2>
            <h2>Dias Disponibles: {service.diasDisponibles}</h2> 
            <h3>Horas Preferidas: {service.horasPreferidas}</h3>
            <h3>Horas diarias: {service.horasDiarias}</h3> 
            <a target='_blank' href={`https://wa.me/${service.whatssap.replace("+" , "")}`} className='whatssap-button'>Whatssap</a>
  
      </div>
    )
  })
  
      }
  
      
      
   </div>
  )
  
  }
  

    return (
      <div className='container-buscaramigo'>
       
            <h1 className='alquilogente'><span style={{fontWeight: "bold", color: "red"}}>¡Solicito</span><span style={{fontWeight: "bold", color: "red"}}> Gente!</span></h1>
            {/* <p> tiene amigos de todo el mundo disponibles para contratar!¿Buscas compañía para ese próximo evento?
                 Contrata un amigo platónico para explorar la ciudad, disfrutar de cenas,
                  conocer nuevas personas y compartir intereses. Ya sea local o en el extranjero,
                   esta tendencia no solo está de moda, ¡también es una experiencia enriquecedora
                    para todos!<NavLink to='/quees'>Leer más</NavLink></p> */}
            <h2>ENTRA UNA UBICACIÓN DONDE SOlICITAS A UN AMIGO O SERVICIO</h2>
            <p style={{color: "black"}}>Buscar por: Ciudad, Estado, Pais</p>
            <div className='container-input-search'>
              <div style={{display: "flex", flexDirection: "row"}}>
                <input type='text' placeholder='Ciudad/Estado/Pais' onChange={challangeInput}></input>
                <button onClick={searchSolicitudesForUbication}>Buscar</button>
              </div>
       
   
   
   
   
        </div>
        
        <div>
        {
  visibilitySearch && searchMap()
}

{
(visibilitySolicitudesDisponibles &&  solicitudesDisponibles) && mapeoSolicitudes()
}

        </div>
   
      </div>
    );
  }

  export default SolicitarPersonas