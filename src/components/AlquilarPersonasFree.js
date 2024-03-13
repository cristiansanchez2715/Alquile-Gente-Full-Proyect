import React from 'react'
import fondo from '../assets/fondo.jpg'
import { useEffect, useState } from 'react'

function AlquilarPersonasFree({serviciosDisponibles, usuarioPresente}) {
const [totalUsuarios, setTotalUsuarios] = useState([])
const [recargarMapeo, setRecargarMapeo] = useState(true)
const [visibilitySearch, setVisibilitySearch] = useState(false)
const [recargarMapeo1, setRecargarMapeo1] = useState(false)
const [servicesSearch, setServicesSearch] = useState()
const [challangeForm, setChallangeForm] = useState()
const [nodo, setNodo] = useState()
const [visibilityServicesWhatssap, setVisibilityServicesWhatssap] = useState(false)
const [visibilityId, setVisibilityId] = useState(null)
const [visibilityServiciosDisponibles, setVisibilityServiciosDisponibles] = useState(true)
const [visibilityPerfil, setVisibilityPerfil] = useState(false)
// mapeando servicios disponibles
// nombrePersona
// tipoAcompaniamiento: "",
// descripcion: "",
// precio: 0,
// diasDisponibles: "",
// horasPreferidas: "",
// horasDiarias: ""
// useEffect(() => {
// setRecargarMapeo(false)
// setRecargarMapeo1(true)
// }, [serviciosDisponibles])

// useEffect(() => {
//   setRecargarMapeo(true)
//   setRecargarMapeo1(false)
// }, [recargarMapeo1])


// opciones visualizacion perfil usuario


const visualizarPerfilUsuario = (user) => {
  const usuario= totalUsuarios.find((u) => {
return u.email === user.nombrePersona
  })

if(usuario){
  setNodo(usuario)
  setVisibilityPerfil(true)
  setVisibilityServiciosDisponibles(false)

}

  



}


const functionPaintPerfil = (usuarioEncontrado) => {
  
  return (
    <div className='container-perfil'>
      <div className='card-presentacion-usuario'>
        <div className='information-perfil'>  
          <h1>Nombre: {usuarioEncontrado.fullname}</h1>
          <h2>Ciudad: {usuarioEncontrado.city}</h2>
          <p>Estado Civil: {usuarioEncontrado.civilStatus}</p>
          <p>Correo Electrónico: {usuarioEncontrado.email}</p>
          <p>Teléfono: {usuarioEncontrado.phone}</p>
          <p>Intereses Personales: {usuarioEncontrado.personalInteres}</p>
          <p>Intereses de Búsqueda: {usuarioEncontrado.searchInteres}</p>
          <p>Actividad Favorita: {usuarioEncontrado.favoriteActivity}</p>
          <p>Gusto Musical: {usuarioEncontrado.musicalTaste}</p>
          <p>Cantidad de Reseñas: {usuarioEncontrado.resenas}</p>
          <p>Cantidad de Solicitudes: {usuarioEncontrado.solicitudes}</p>
          <p>Cantidad de Servicios: {usuarioEncontrado.servicios}</p>
          <p>Vive Con: {usuarioEncontrado.whoDoYouLive}</p>
          <p>Consume Alcohol: {usuarioEncontrado.alcoholimetro}</p>
        </div>

        <div className='container-img-perfil'>
        <img className='img-perfil' src={`http://localhost:4000/public/uploads/${usuarioEncontrado.imagen}`} alt='No cargo F'/>
          <h2>Información Bancaria:</h2>
          {/* <p>IBAN: {usuarioPresente.iban}</p> */}
          {/* <p>Método de Pago: {usuarioPresente.payMethod || 'No especificado'}</p> */}
          <h2>Seguridad:</h2>
          {/* <p>Pregunta Secreta: {usuarioPresente.secretAsk}</p> */}
          {/* <p>Contraseña Confirmada: {usuarioPresente.confirm_password}</p> */}
        </div>
      </div>
    </div>
)
}

// trallendo usuarios


const getUsuarios = () => {
  fetch("http://localhost:4000/traerUsuarios")
  .then(res => res.json())
  .then(data => { setTotalUsuarios(data);
  // console.log(totalUsuarios);
}
)
}

useEffect(() => {
getUsuarios()
}, [])





const functionVisibilityWhatssapServices = (id) => {
  setVisibilityServicesWhatssap(!visibilityServicesWhatssap)
  setVisibilityId(id)
}

const mapeoServicios = () => {
  return(
    <div className="container-servicios">
  {
    serviciosDisponibles.map((servicio, index) => {
      return (
        <div key={index} className="card-servicio">
          <h1>Nombre: {servicio.nombrePersona}</h1>
          <h2 id='ubicacion-service'>Ubicacion:
  <br></br>{servicio.ubicacion}</h2>
  <img className='img-servicio' style={{width: "100px", height: "100px", borderRadius: "50%"}} src={`http://localhost:4000/public/uploads/${servicio.imagen}`} />
          <h2>Tipo de Acompañamiento: {servicio.tipoAcompaniamiento}</h2>
          <p>Descripcion: {servicio.descripcion}</p>
          <h2><span style={{color: "red"}}> PRECIO: {servicio.precio}</span></h2>
          <h2>Dias Disponibles: {servicio.diasDisponibles}</h2> 
          <h3>Horas Preferidas: {servicio.horasPreferidas}</h3>
          <h3>Horas diarias: {servicio.horasDiarias}</h3>   
          {/* <h4>Numero: {servicio.whatssap}</h4> */}
          <button onClick={() => visualizarPerfilUsuario(servicio)}>Ver Informacion</button>
          <button className='btn-contratar' onClick={() => functionVisibilityWhatssapServices(servicio.id)}>Contratar</button>
<div>
{visibilityServicesWhatssap && visibilityId === servicio.id && <a target='_blank' href={`https://wa.me/${servicio.whatssap.replace("+" , "")}`} className='whatssap-button'>Whatssap</a>}
</div>

        </div>
      );
    })
  }
</div>

  )
}


// buscar por ubicacion

const challangeInput = (e) => {
  setChallangeForm(e.target.value)
  setVisibilitySearch(false)
  setVisibilityServiciosDisponibles(true)
}


const searchServicesForUbication = () => {
const search = serviciosDisponibles.filter((services) => {
 return services.ubicacion.toLowerCase().includes(challangeForm)
})
  setServicesSearch(search)
  setVisibilitySearch(true)
  setVisibilityServiciosDisponibles(false)
}

// mapeando busqueda

const searchMap = () => {

  
return(
  <div className='container-servicios'>
    {
servicesSearch.map((service, index) => {
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


// RETURN COMPONENTE

  return (
<div>    
<div className='container-buscaramigo'>
<h1 className='alquilogente'><span style={{fontWeight: "bold", color: "red"}}>¡Alquilo</span><span style={{fontWeight: "bold", color: "red"}}> Gente!</span></h1>
{/* <p> tiene amigos de todo el mundo disponibles para contratar!¿Buscas compañía para ese próximo evento?
   Contrata un amigo platónico para explorar la ciudad, disfrutar de cenas,
    conocer nuevas personas y compartir intereses. Ya sea local o en el extranjero,
     esta tendencia no solo está de moda, ¡también es una experiencia enriquecedora
      para todos!<NavLink to='/quees'>Leer más</NavLink></p> */}

<h1 style={{color: "black"}}>ENTRA UNA UBICACIÓN DONDE BUSCAS ALQUILAR A UN AMIGO</h1>
<p style={{color: "black"}}>Buscar por: Ciudad, Estado, Pais</p>

<div className='container-input-search'>
  <div style={{display: "flex", flexDirection: "row"}}>
  <input onChange={challangeInput} type='text' placeholder='Ciudad/Estado/Pais'></input>
  <button onClick={searchServicesForUbication}>Buscar</button>

</div>


  </div>

  {
  visibilitySearch && searchMap()
}

{
(visibilityServiciosDisponibles &&  serviciosDisponibles) && mapeoServicios()
}
{
  visibilityPerfil && functionPaintPerfil(nodo)
}
</div>



</div>
  )
}

export default AlquilarPersonasFree