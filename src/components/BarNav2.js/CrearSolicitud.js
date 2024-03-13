import React, { useState } from 'react';
import imgBarNav from '../../assets/not-found/logo-removebg-preview.png';
import { useEffect } from 'react';


function CrearSolicitud({usuarioPresente}) {
const [totalUsuarios, setTotalUsuarios] = useState([])
const [error, setError] = useState(null)
  const [solicitudesGeneradas, setSolicitudesGeneradas] = useState(0)
    const [solicitudGenerada, setSolicitudGenerada] = useState(false)
    const [generandoSolicitud, setGenerandoSolicitud] = useState({
        nombrePersona: usuarioPresente.email,
        imagen: usuarioPresente.imagen,
        ubicacion: "",
      tipoAcompaniamiento: "",
      descripcion: "",
      precio: 0,
      diasDisponibles: "",
      horasPreferidas: "",
      horasDiarias: "",
      whatssap: "",
      imagen: usuarioPresente.imagen
    })

    
useEffect(() => {
  console.log("este es el usuario presente: " + JSON.stringify(usuarioPresente))
}, [] )

// OBTENER USUARIOS DE LA API

const getUsuarios = () => {
  fetch("http://localhost:4000/traerUsuarios")
  .then(res => res.json())
  .then(data => { setTotalUsuarios(data);

        // console.log("estos son los usuarios" + JSON.stringify(totalUsuarios))
}
)
}

useEffect(() => {
getUsuarios()
}, [])



// funcion comprobacion
const comprobacionNumeroServicios = (e) => {
  e.preventDefault()
   if (usuarioPresente.solicitudes >= 2) {
    setError("Lo siento, usted ya ha generado más de una solicitud");
  } else {
   handleSubmit(e);
  }
};    



    // LOGICA DEL FORMULARIO
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setGenerandoSolicitud(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    
    const handleSubmit = (e) => {
      
      e.preventDefault();
      
    console.log(generandoSolicitud)
    sendSolicitud()
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
    
       setSolicitudGenerada(true)
    setGenerandoSolicitud({
      nombrePersona: usuarioPresente.email,
      ubicacion: "",
    tipoAcompaniamiento: "",
    descripcion: "",
    precio: 0,
    diasDisponibles: "",
    horasPreferidas: "",
    horasDiarias: "",
    whatssap: "",
    imagen: usuarioPresente.imagen
    })
    }




// aumentar en 1 las solicitudes del backend
const aumentarSolicitudesEn1 = async () => { 
  try {
    const response = await fetch(`http://localhost:4000/solicitud/${usuarioPresente.id}`, {
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

// MANDAR DATOS DE LA SOLICITUD AL BACKEND 

    const apiSendSolicitud = "http://localhost:4000/enviarSolicitud"


  const sendSolicitud = () => {
    // setNewResena(newResena + 1)
  
    const opciones = {
      method: 'POST', // Método de la solicitud
      headers: {
          'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
      },
      body: JSON.stringify(generandoSolicitud) // Los datos que estás enviando, convertidos a formato JSON
  };
  
  fetch(apiSendSolicitud, opciones)
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
  setSolicitudesGeneradas(solicitudesGeneradas + 1)
  aumentarSolicitudesEn1() 

  }
  // useEffect(() => {
  //   const aumentarSolicitudes = async () => {
  //     try {
  //       await aumentarSolicitudesEn1();
  //     } catch (error) {
  //       console.error('Error al aumentar las solicitudes:', error);
  //     }
  //   };
  
  //   aumentarSolicitudes();
  // }, [solicitudesGeneradas]);
  
  // RETORNO COMPONENTE
  return (
        <div className='container-explicacion-crear-servicio'>
    <div>
        <h1>Estas buscando un amigo, persona o servicio?</h1>
        <h2>En nuestro sitio web no solo puedes buscar un amigo o servicio sino que puedes crear una solicitud que este a tu medida al precio que prefieras!!</h2>
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
                <option value="">Seleccione el servicio que solicita</option>
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
              <textarea onChange={handleChange}  className='inscription-form-input'type="text" name="descripcion" id='descripcion' placeholder="Que estas buscando en esta persona?" />
            </div>
            <div className="inscription-form-group">
              <input onChange={handleChange} className='inscription-form-input' type="number" name="precio" id='precio' placeholder="Precio: Dolares por Hora" />
            </div>
            <div className="inscription-form-group">
              <input onChange={handleChange} className='inscription-form-input' type="text" name="diasDisponibles" id='diasDisponibles' placeholder="Días A La Semana" />
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
            {solicitudGenerada && <div className='container-exito'>
              <h2>Felicidades se ha generado el servicio</h2>
              </div>}

              {error && <div className='container-error'>
            <h3>{error}</h3>
            </div>}
          </form>
    
    
        </div>
      )
    }
    
    export default CrearSolicitud
    