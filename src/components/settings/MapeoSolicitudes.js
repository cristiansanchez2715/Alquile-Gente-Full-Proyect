import React from 'react'
import { useEffect, useState } from 'react';

function MapeoSolicitudes({usuarioPresente}) {
const [totalSolicitudes, setTotalSolicitudes] = useState([])

// FUNCION ELIMINAR SOLICITUDES


// SOLICITUDES  


// SE LE DEBE PASAR EL USUARIOPRESENTE.EMAIL
const eliminarSolicitud = (solicitudId) => {

  const nuevasSolicitudes = totalSolicitudes.filter((solicitud) => {
    return solicitud.id !== solicitudId
  })
  
    const url = `http://localhost:4000/deletesolicitud/${solicitudId}`;
  
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
      setTotalSolicitudes(nuevasSolicitudes)
      reducirSolicitudesEn1()
      // Aquí podrías realizar alguna acción adicional, como actualizar la interfaz de usuario
    })
    .catch(error => {
      console.error('Error al eliminar el servicio:', error);
      // Aquí podrías manejar el error, como mostrar un mensaje al usuario
    });
  };
  
  
  // LOGICA REDUCIR SOLICITUDES EN 1
  
  
  const reducirSolicitudesEn1 = async () => { 
    try {
      const response = await fetch(`http://localhost:4000/reducirsolicitud/${usuarioPresente.id}`, {
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
  
  





// TRAEER TODAS LAS SOCILITUDES
    const getSolicitudes = async () => {
        try {
          const res = await fetch("http://localhost:4000/traerSolicitudes");
          const data = await res.json();
          setTotalSolicitudes(data);
        } catch (error) {
          console.error("Error al obtener las solicitudes:", error);
        }
      }
      
      useEffect(() => {
        getSolicitudes();

        
      }, []);
      


    const functionSolicitudesOfThisUser = () => {

        const solicitudesOfThisUser = totalSolicitudes.filter((service) => {
          return service.nombrePersona === usuarioPresente.email
        });
        
        return (
          <div  className='container-buttons-publicaciones'>
            { solicitudesOfThisUser.map((servicio, index) => {
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
                  <button onClick={() => eliminarSolicitud(servicio.id)}>Eliminar</button>  
                </div>
              )
            })}
          </div>
        );
        }
      


  return (
    <div>
        {functionSolicitudesOfThisUser()}
    </div>
  )
}

export default MapeoSolicitudes