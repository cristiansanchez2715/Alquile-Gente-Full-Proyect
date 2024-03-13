import React from 'react'
import { useEffect, useState } from 'react';

function MapeoResenas({usuarioPresente}) {
  const [totalReseñas, setTotalReseñas] = useState([])

// LOGICA ELIMINAR UNA RESENA
  


// SE LE DEBE PASAR EL USUARIOPRESENTE.EMAIL
const eliminarResena = (resenaId) => {

  const nuevasReseñas = totalReseñas.filter((reseña) => {
    return reseña.id !== resenaId
  })
  
    const url = `http://localhost:4000/deleteresena/${resenaId}`;
  
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
      setTotalReseñas(nuevasReseñas)
      reducirReseñasEn1()
      // Aquí podrías realizar alguna acción adicional, como actualizar la interfaz de usuario
    })
    .catch(error => {
      console.error('Error al eliminar el servicio:', error);
      // Aquí podrías manejar el error, como mostrar un mensaje al usuario
    });
  };
  
  
  // LOGICA REDUCIR SOLICITUDES EN 1
  
  
  const reducirReseñasEn1 = async () => { 
    try {
      const response = await fetch(`http://localhost:4000/reducirresena/${usuarioPresente.id}`, {
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





  // RESEÑAS

  const functionResenasOfThisUser = () => {
    const resenasOfThisUser = totalReseñas.filter((service) => {
      return service.nombre === usuarioPresente.email
    });
    
    return (
      <div className='container-buttons-publicaciones'>
        {resenasOfThisUser && resenasOfThisUser.map((servicio, index) => {
          return (
            <div className='card-service-settings' key={index}>
              <h1>Nombre: {usuarioPresente.email}</h1>
              <h2>Reseña: {servicio.resena}</h2>
              <button onClick={() => eliminarResena(servicio.id)}>Eliminar Reseña</button>
            </div>
          )
        })}
      </div>
    );
  }  




    const getReseñas = async () => {
        try {
          const res = await fetch("http://localhost:4000/traerResenas");
          const data = await res.json();
          setTotalReseñas(data);
        } catch (error) {
          console.error("Error al obtener las reseñas:", error);
        }
      }
      
      useEffect(() => {
        getReseñas();
      }, []);
      

  return (
    <div>{functionResenasOfThisUser()}</div>
  )
}

export default MapeoResenas