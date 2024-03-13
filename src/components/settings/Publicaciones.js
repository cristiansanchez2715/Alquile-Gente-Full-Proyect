import React from 'react'
import { useState, useEffect } from 'react'
import MapeoSolicitudes from './MapeoSolicitudes'
import MapeoResenas from './MapeoResenas'


function Publicaciones({usuarioPresente}) {
  const [totalReseñas, setTotalReseñas] = useState([])
  const [totalServicios, setTotalServicios] = useState([])
  const [totalSolicitudes, setTotalSolicitudes] = useState([])

  const getServices = () => {
    fetch("http://localhost:4000/traerServicios")
    .then(res => res.json())
    .then(data => setTotalServicios(data))
  }
 
useEffect(() => {
getServices()
}, [])




// MAPEO PUBLICACIONES USUARIOS


// SERVICIOS

const functionServicesOfThisUser = () => {

const servicesOfThisUser = totalServicios.filter((service) => {
  return service.nombrePersona === usuarioPresente.email
});

return (
  <div  className='container-buttons-publicaciones'>
    {servicesOfThisUser && servicesOfThisUser.map((servicio, index) => {
      return(
        <div className='card-service-settings' key={index}>
          <h1>Nombre: {servicio.nombrePersona}</h1>
          <img className='img-servicio' style={{width: "100px", height: "100px", borderRadius: "50%"}} src={`http://localhost:4000/public/uploads/${servicio.imagen}`} />
          <h2 id='ubicacion-service'>Ubicacion: <br></br>{servicio.ubicacion}</h2>
          <h2>Se Solicita: {servicio.tipoAcompaniamiento}</h2>
          <p>Descripcion: {servicio.descripcion}</p>
          <h2><span style={{color: "red"}}> PRECIO: {servicio.precio}</span></h2>
          <h2>Dias Disponibles: {servicio.diasDisponibles}</h2> 
          <h3>Horas Preferidas: {servicio.horasPreferidas}</h3>
          <h3>Horas diarias: {servicio.horasDiarias}</h3> 
          <button onClick={() => eliminarServicio(servicio.id)}>Eliminar</button>  
        </div>
      )
    })}
  </div>
);
}

// FUNCIONES MODIFICACION BD


// SERVICIOS  


// SE LE DEBE PASAR EL USUARIOPRESENTE.EMAIL
const eliminarServicio = (servicioId) => {

const nuevosServicios = totalServicios.filter((service) => {
  return service.id !== servicioId
})

  const url = `http://localhost:4000/deleteservice/${servicioId}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo eliminar el servicio.');
    }
    console.log('El servicio se ha eliminado correctamente.');
    setTotalServicios(nuevosServicios)
    reducirServiciosEn1()
    // Aquí podrías realizar alguna acción adicional, como actualizar la interfaz de usuario
  })
  .catch(error => {
    console.error('Error al eliminar el servicio:', error);
    // Aquí podrías manejar el error, como mostrar un mensaje al usuario
  });
};


// LOGICA REDUCIR SERVICIOS EN 1


const reducirServiciosEn1 = async () => { 
  try {
    const response = await fetch(`http://localhost:4000/reducirservicio/${usuarioPresente.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // No es necesario enviar el body en este caso
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos.');
    }

    const data = await response.text();
    console.log('Datos recibidos:', data);
  } catch (error) {
    console.error('Error:', error);
  }
} 








// RETORNO COMPONENTE


  return (
    <div>
<div>
  <h2 className='title-publicaciones'>Servicios</h2>

  {totalServicios && functionServicesOfThisUser()}
</div>

<div>
<h2 className='title-publicaciones'>Solicitudes</h2>
<React.Fragment>
  <MapeoSolicitudes usuarioPresente={usuarioPresente} />
</React.Fragment>
</div>


<div>
<h2 className='title-publicaciones'>Reseñas</h2>
<React.Fragment>
  <MapeoResenas usuarioPresente={usuarioPresente} />
</React.Fragment>
</div>
    </div>
  )
}

export default Publicaciones