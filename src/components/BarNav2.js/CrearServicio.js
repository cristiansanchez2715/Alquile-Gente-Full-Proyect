import React from 'react'

import imgBarNav from '../../assets/not-found/logo-removebg-preview.png'
import { useState, useEffect } from 'react'

function CrearServicio({serviciosDisponibles, setServiciosDisponibles, usuarioPresente}) {
const [error, setError] = useState(null)
const [totalUsuarios, setTotalUsuarios] = useState([])
  const [servicioGenerado, setServicioGenerado] = useState(false)
  const [generandoServicio, setGenerandoServicio] = useState({
    nombrePersona: usuarioPresente.email,
    ubicacion: "",
  tipoAcompaniamiento: "",
  descripcion: "",
  precio: 0,
  diasDisponibles: "",
  horasPreferidas: "",
  horasDiarias: "",
  whatssap: "",
  imagen: usuarioPresente && usuarioPresente.imagen ? JSON.stringify(usuarioPresente.imagen) : "",
})


// OBTENER USUARIOS DE LA API

const getUsuarios = () => {
  fetch("http://localhost:4000/traerUsuarios")
  .then(res => res.json())
  .then(data => { setTotalUsuarios(data);

        console.log("estos son los usuarios" + JSON.stringify(totalUsuarios))
}
)
}

useEffect(() => {
getUsuarios()
}, [])



// funcion comprobacion
const comprobacionNumeroServicios = (e) => {
  e.preventDefault()
  if (usuarioPresente.servicios >= 2) {
    setError("Lo siento, usted ya ha generado más de un servicio");
  } else {
    handleSubmit(e);
  }
};
// AUMENTAR SERVICIOS EN 1

const aumentarServiciosEn1 = async () => { 
  try {
    const response = await fetch(`http://localhost:4000/servicio/${usuarioPresente.id}`, {
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

// LOGICA DEL FORMULARIO

const handleChange = (e) => {
  const { name, value } = e.target;
  setGenerandoServicio(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSubmit = (e) => {
  
  e.preventDefault();
  
console.log(generandoServicio)
sendServicio()
aumentarServiciosEn1()
  // Envía una copia del estado actualizado de generandoServicio a serviciosDisponibles
  
  // Restablece los campos del formulario
   // Restablece los campos del formulario estableciendo sus valores a una cadena vacía
   document.getElementById("nombrePersona").value = "";
   document.getElementById("ubicacion").value = "";
   document.getElementById("tipoAcompaniamiento").value = "";
   document.getElementById("descripcion").value = "";
   document.getElementById("precio").value = "";
   document.getElementById("diasDisponibles").value = "";
   document.getElementById("horasPreferidas").value = "";
   document.getElementById("horasDiarias").value = "";
   document.getElementById("whatssap").value = "";

   setServicioGenerado(true)
setGenerandoServicio({
  nombrePersona: usuarioPresente.email,
  ubicacion: "",
tipoAcompaniamiento: "",
descripcion: "",
precio: 0,
diasDisponibles: "",
horasPreferidas: "",
horasDiarias: "",
whatssap: "",
imagen: usuarioPresente
})
}




// LOGICA OBTENER UBICACION

const [ubicaciones, setUbicaciones] = useState([]);
  const API_KEY = '63e871f44e8a4d56b20c53b307c60ba2';

  useEffect(() => {
    obtenerUbicacion();
  }, []);


  // LOGICA UBICACION (DESCARTADA POR EL MOMENTO)
  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;

        // Llamar a la API de OpenCage Geocoding para obtener datos de ubicación
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitud}+${longitud}&key=${API_KEY}`)
          .then(response => response.json())
          .then(data => {
            // Filtrar solo las ciudades
            const ciudades = data.results.filter(resultado => resultado.components._type === 'city');
            setUbicaciones(ciudades);
          })
          .catch(error => {
            console.error('Error al obtener datos de ubicación:', error);
          });

      }, () => {
        console.error('No se pudo obtener la ubicación del usuario.');
      });
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
    }
  };



  // LOGICA BACKEND PARA ENVIAR EL SERVICIO

const apiSendService = "http://localhost:4000/enviarServicio"


  const sendServicio = () => {
    // setNewResena(newResena + 1)
  
    const opciones = {
      method: 'POST', // Método de la solicitud
      headers: {
          'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
      },
      body: JSON.stringify(generandoServicio) // Los datos que estás enviando, convertidos a formato JSON
  };
  
  fetch(apiSendService, opciones)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error al enviar los datos.');
          }
          return response.json(); // Convertir la respuesta del servidor a JSON
      })
      .then(data => {
          console.log('Datos recibidos:', data); // Hacer algo con los datos recibidos del servidor
      })
      .catch(error => {
          console.error('Error:', error); // Manejar cualquier error que ocurra durante la solicitud
      });
  
   
  }
  
// RETURN DEL COMPONENTE

  return (
    <div className='container-explicacion-crear-servicio'>
<div>
    <h1>Deseas crear un servicio para generar algo de dinero?</h1>
    <h2>En nuestro sitio web puedes ofertar tus servicios de compañia (amistosa), ser una compañia para personas que no tienen un apoyo y de paso generar algo de dinero; Es una experiencia en la que todos ganamos!</h2>
</div>

<form onSubmit={(e) =>comprobacionNumeroServicios(e)} className='form-unete-container' style={{marginLeft: "175px"}}>
<div  className='logo-container2' id='logo-form' style={{marginLeft: "0px",fontSize: "35px" ,display: "flex", flexDirection: "row", paddingTop: "0px"}}>
  <h2><span style={{color: "red",} }>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
    <img src={imgBarNav} className='img-form' />
</div>


<div className="inscription-form-group">
          <input onChange={handleChange} className='inscription-form-input' type="text"  id='nombrePersona' placeholder="Nombre Favorito" />
        </div>
             <label>Ingresa la ubicacion en el formato solicitado de lo contrario nadie podra ver tu servicio.</label>
        <div className="inscription-form-group">
        <label >Ubicación:</label>
      
      <input onChange={handleChange} placeholder='Ciudad/Estado/pais' className='inscription-form-input' id='ubicacion' name='ubicacion' type='text' />
      </div>

        <div className="inscription-form-group">
        <select onChange={handleChange} className='inscription-form-input' name="tipoAcompaniamiento" id='tipoAcompaniamiento'>
            <option value="">Seleccione el servicio que ofrece</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="apoyoEmocional">Apoyo Emocional</option>
            <option value="companiaEvento">Acompañante para evento</option>
            <option value="apoyoDeportivo">Apoyo Deportivo</option>
            <option value="serviciosProfesionales">Servicios Profesionales</option>
            <option value="compañeroDeFiestas">Compañero de Fiesta</option>
            <option value="guiaTuristico">Guia Turistico</option>
            <option value="profesor">Profesor</option>
            <option value="asesorComercial">Asesor Comercial</option>
          </select>
          </div>
        <div className="inscription-form-group">
          <textarea onChange={handleChange}  className='inscription-form-input'type="text" name="descripcion" id='descripcion' placeholder="Cual es tu interes al ofrecer este Servicio?" />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} className='inscription-form-input' type="number" name="precio" id='precio' placeholder="Precio: Dolares por Hora" />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} className='inscription-form-input' type="text" name="diasDisponibles" id='diasDisponibles' placeholder="Días Disponibles A La Semana" />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} className='inscription-form-input' type="text" name="horasPreferidas" id='horasPreferidas' placeholder="Horas Preferidas" />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} className='inscription-form-input' type="text" name="horasDiarias" id='horasDiarias' placeholder="Horas Disponibles al Dia" />
        </div>

        <div className="inscription-form-group">
          {/* <label>Introduzca su indicativo y su whatssap sin simbolo "+" ejemplo: "573203207924"</label> */}
          <input onChange={handleChange} className='inscription-form-input' type="text" name="whatssap" id='whatssap' placeholder="indicativo + Whatssap" />
        </div>


        <button className='inscription-form-submit' type="submit">Enviar</button>
        {servicioGenerado && <div className='container-exito'>
          <h2>Felicidades se ha generado el servicio</h2>
          </div>}
          {error && <div className='container-error'>
            <h3>{error}</h3>
            </div>}
      </form>


    </div>
  )
}

export default CrearServicio




//   return (
//     <div>
//       <h1>Seleccionar Ubicación</h1>
//       <label htmlFor="ubicacion">Ubicación:</label>
//       <select id="ubicacion">
//         <option value="">Selecciona una ubicación</option>
//         {ubicaciones.map((ubicacion, index) => (
//           <option key={index} value={ubicacion.formatted}>
//             {ubicacion.formatted}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default App;
// En

{/* <select id="ubicacion" className='inscription-form-input' name='ubicacion'>
      <option value="">Selecciona una ubicación</option>
        {ubicaciones.map((ubicacion, index) => (
          <option key={index} value={ubicacion.formatted}>
            {ubicacion.formatted}
          </option>
        ))}
      </select> */}