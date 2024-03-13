import React from 'react'
import { useState, useEffect } from 'react'
import ComponenteDePago from './ComponenteDePago'
import imgBarNav from '../assets/not-found/logo-removebg-preview.png'
// import { useEffect } from 'react'

function UneteAhora({ setNuevoUsuario, nuevoUsuario}) {

  const [totalUsuarios, setTotalUsuarios] = useState([])

  
// OBTENER USUARIOS DE LA API

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

// logica capturar evento formulario de registro
const [completeForm, setCompleteForm] = useState(false)
  const [newUsuarioChallange, setNewUsuarioChallange] = useState(
  
    {
    fullname: "",
    email: "",
    phone: "",
    city: "",
    iban: "",
    password: "",
    confirm_password: "",
    civilStatus: "",
    searchInteres: "",
    personalInteres: "",
    whoDoYouLive: "",
    musicalTaste: "",
    favoriteActivity: "",
    alcoholimetro: "",
    secretAsk: '',
  secretAnswer: ''
  }
) 
const [errorForm, setErrorForm] = useState("")
   
const [visibilityForm1, setVisibilityForm1] = useState(true)
const [visibilityForm2, setVisibilityForm2] = useState(false)
const [visibilityComponentePago, setVisibityComponentePago] = useState(false)


// Funcion visibilidad componente de pago

const functionVisibilityPayComponent = () => {
  setVisibilityForm1(false)
  setVisibilityForm2(false)
  setVisibityComponentePago(true)
}


// capturar eventos del formulario

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewUsuarioChallange(prevState => ({
    ...prevState,
    [name]: value
  }));
};

// ENVIAR DATA AL COMPONENTE APP

const handleSubmit = (e) => {
  e.preventDefault()
sendUsuario()
  setNewUsuarioChallange({
  payMethod: '',
  fullname: '',
  email: '',
  phone: '',
  city: '',
  iban: '',
  password: '',
  confirm_password: '',
  civilStatus: '',
  searchInteres: '',
  personalInteres: '',
  whoDoYouLive: '',
  musicalTaste: '',
  favoriteActivity: '',
  alcoholimetro: "",
  secretAsk: '',
  secretAnswer: ''
});
  setCompleteForm(true)

}

// FUNCION COMPROBACION, PASSWORDS

// FUNCIONES DE SEGURIDAD




  // FORMULARIO DE ACTIVIDADES
  const functionForm2 = (item) => {
    return(
      <form onSubmit={handleSubmit} className='form-unete-container'>
        <button onClick={() => formulario1VisibleFunction}>x</button>
        <div className='logo-container2' id='logo-form' style={{ fontSize: "35px",display: "flex", flexDirection: "row", marginLeft: "-5px"}}>
          <h2><span style={{color: "red", fontSize: "35px"}}>!Alquile </span><span style={{fontSize: "35px", color: "blue"}}>Gente¡</span> </h2>
          <img src={imgBarNav} className='img-form' />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="civilStatus" id="civilStatus" placeholder="Estado Civil" className='inscription-form-input' />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="searchInteres" id="searchInteres" placeholder="Interés de Búsqueda" className='inscription-form-input'/>
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="personalInteres" id="personalInteres" placeholder="Intereses Personales" className='inscription-form-input' />
        </div>
        
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="whoDoYouLive" id="whoDoYouLive" placeholder="Con Quien Vives?" className='inscription-form-input' />
        </div>
  
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="musicalTaste" id="musicalTaste" placeholder="Gusto Musical Favorito" className='inscription-form-input' />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="favoriteActivity" id="favoriteActivity" placeholder="Actividad Favorita" className='inscription-form-input' />
        </div>
<div className='inscription-form-group'>
        <select onChange={handleChange} className='inscription-form-input' name="alcoholimetro" id='tipoAcompaniamiento'>
            <option value="">Consumes Alcohol?</option>
            <option value="bebedor">Si</option>
            <option value="no bebedor">No</option>
            
          </select>
          </div>   
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="secretAsk" id="secretAsk" placeholder="Pregunta Secreta" className='inscription-form-input' title='Recuerda que esta pregunta y su respuesta seran el unico medio que tendras para comprobar tu identidad' />
        </div>

        
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="secretAnswer" id="secretAnswer" placeholder="Respuesta Secreta" className='inscription-form-input' title='Recuerda que esta pregunta y su respuesta seran el unico medio que tendras para comprobar tu identidad'/>
        </div>
        <button type='submit'>Enviar</button>
  
        {completeForm && <div className='container-exito'>
          <h2>Usuario Registrado con Exito</h2>
        </div>}
      </form>
    )
  
}
  // función visibilidad formularios
  const formulario1VisibleFunction = () => {
    setVisibilityForm1(true)
    setVisibilityForm2(false)
  }
  
  const formulario2VisibleFunction = (e) => {
e.preventDefault()
    if(newUsuarioChallange.password === newUsuarioChallange.confirm_password){
const emailUsuario = totalUsuarios.find((obj) => {
  return obj.email === newUsuarioChallange.email
})

      if(emailUsuario){
        setErrorForm("Este Correo ya ha sido Registrado")
      }
      else {
    setVisibilityForm1(false)
    setVisibilityForm2(true)
  }
  }
  else {
    setErrorForm("Las Contraseñas No Coinciden")
  }
  }

// LOGICA BACKEND

  // ENVIAR DATOS DEL USUARIO A LA BASE DE DATOS
  // LOGICA BACKEND PARA ENVIAR EL SERVICIO

  const apiSendUser = "http://localhost:4000/enviarUsuario"


  const sendUsuario = () => {
    // setNewResena(newResena + 1)
  
    const opciones = {
      method: 'POST', // Método de la solicitud
      headers: {
          'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
      },
      body: JSON.stringify(newUsuarioChallange) // Los datos que estás enviando, convertidos a formato JSON
  };
  
  fetch(apiSendUser, opciones)
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



  // RETORNO
  return (
    <div className='container-unete'>
      <div className='container-explicacion-unete' >
        <h1 style={{color: "black"}}>¿Por qué unirte a nosotros?</h1>
        <p style={{color: "black"}}>
          Gracias a nuestra gran comunidad, podrás conocer personas no solo de la localidad en la que estás, sino de <span style={{color: "blue"}}>CUALQUIER</span> parte del mundo.
        </p>
        <p style={{color: "black"}}>
        ¡Y lo mejor de todo es que nuestros usuarios establecen los precios, <span style={{color: "red"}}>¡ENCUENTRA OPCIONES A TU MEDIDA!</span>
        </p>
      </div>
  
      {visibilityForm1 && <form className='form-unete-container'>
  
        <div className='logo-container2' id='logo-form' style={{fontSize: "35px" ,display: "flex", flexDirection: "row", marginLeft: "0px"}}>
          <h2><span style={{color: "red"}}>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
          <img src={imgBarNav} className='img-form' />
        </div>
        <div className='container-explicacion-registro'>
          <h1>Si Deseas Inscribirte Para Hacer Oficialmente Parte De Nuestra Comunidad, Diligencia El Siguiente Formulario</h1>
        </div>
  
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="fullname" id="fullname" className="inscription-form-input" placeholder="Nombre y apellidos reales como figuran en el DNI" required />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="email" name="email" id="email" className="inscription-form-input" placeholder="Correo electrónico" required />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="tel" name="phone" id="phone" className="inscription-form-input" placeholder="Número de móvil" required />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="city" id="city" className="inscription-form-input" placeholder="Ciudad" required />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="text" name="iban" id="iban" className="inscription-form-input" placeholder="IBAN o método para recibir el dinero del inquilino" required />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="password" name="password" id="password" className="inscription-form-input" placeholder="Contraseña" required />
        </div>
        <div className="inscription-form-group">
          <input onChange={handleChange} type="password" name="confirm_password" id="confirm_password" className="inscription-form-input" placeholder="Confirmar contraseña" required />
        </div>
        <button className="inscription-form-submit" onClick={(e) => {
          formulario2VisibleFunction(e)
        }}>Registrarse</button>
  
        <div className='container-explicacion-registro'>
          <h1>Debe Diligenciar Correctamente Todos Los Campos Del Formulario Si Desea Continuar Con El Proceso</h1>
        </div>
        <div className='error-container'>
{
  errorForm && 
  <h1>{errorForm}</h1>
}
        </div>
      
      </form>}
      {
        visibilityForm2 && functionForm2()
      }

      {
        visibilityComponentePago && <ComponenteDePago nuevoUsuario={nuevoUsuario} />
      }
  
    </div>
  )
}

export default UneteAhora