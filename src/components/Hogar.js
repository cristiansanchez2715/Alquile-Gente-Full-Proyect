// import React from 'react'
import { NavLink } from 'react-router-dom'
import React from 'react'
import IniciarSesion from './IniciarSesion'
import simboloAmistad1 from '../assets/not-found/simboloamistad-removebg-preview.png'
import simboloAmistad2 from '../assets/not-found/simboloAmistad2-removebg-preview.png'
import { useState, useEffect } from 'react'

function Hogar({visibilityLogIn, usuarioPresente}) {
const [challangeForm, setChallangeForm] = useState({nombre: "", resena: ""})
const [totalResenas, setTotalResenas] = useState([])
const [error, setError] = useState("")
const [addReseña, setAddReseña] = useState("")
const [newResena, setNewResena] = useState(0)


// AUMENTAR RESEÑAS EN 1

const aumentarReseñasEn1 = async () => { 
  try {
    const response = await fetch(`http://localhost:4000/resena/${usuarioPresente.id}`, {
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
// logica cambio formulario

const handleChange = (e) => {
  const { name, value } = e.target;
  setChallangeForm(prevState => ({
    ...prevState,
    [name]: value
  }));
};


const handleSubmit = () => {
  functionComprobandoReseña()
}

// LOGICA BACKEND

// TRAYENDO RESEÑAS 

useEffect(() => {
const apiGetResenas = 'http://localhost:4000/traerResenas'

fetch(apiGetResenas)
.then(res => res.json())
.then(data => setTotalResenas(data))
}, [])


useEffect(() => {
  const apiGetResenas = 'http://localhost:4000/traerResenas'
  
  fetch(apiGetResenas)
  .then(res => res.json())
  .then(data => setTotalResenas(data))
  }, [newResena])



// envio de reseñas

const APISendResena = "http://localhost:4000/enviarResenas";



const sendReseña = () => {
  setNewResena(newResena + 1)
  const opciones = {
    method: 'POST', // Método de la solicitud
    headers: {
        'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
    },
    body: JSON.stringify(challangeForm) // Los datos que estás enviando, convertidos a formato JSON
};

fetch(APISendResena, opciones)
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

    setAddReseña("Reseña añadida, felicidades")
    setError("")
    document.getElementById("reseña").value = "";
    document.getElementById("nombre").value = "";
    setChallangeForm({nombre: "", resena: ""})
  
}


// COMPROBACION DE RESEÑAS 

const functionComprobandoReseña =() => {
if(newResena > 0){
setError("Ya has dejado una reseña.")  
}
else if(newResena === 0) {
  sendReseña()
  aumentarReseñasEn1()
  setNewResena(newResena + 1)
  }
}


  return (
    <div className='container-hogar'>
        <div className='reseñasyHogar'>
        
        <div className='container-primeraimpresion'>
        <div>
  <h1>Arrienda Compañia!</h1>
  <h2>Servicio de acompañamiento amistoso para todas las personas, sin importar su estrato, color o clase social</h2>
  <h2 style={{color: "black"}}>Alquile Gente es un servicio excepcional que <span style={{color: "red"}}>TE PERMITE</span> contratar a alguien para ser tu amigo por un día o para <span style={{color: "red", fontWeight: "bold"}}>TODA LA VIDA.</span></h2>
  <h2 style={{color: "black"}}>Ofrecemos nuestros servicios en América Latina y más allá. ¡Obtén lo que necesitas hoy mismo!</h2>
  <ul>
    <li><h2>Acompañante Lúdico</h2></li>
    <li><h2>Asistencia Personal</h2></li>
    <li><h2>Amigos al Instante</h2></li>
    <li><h2>Ofrece tus Propios Servicios</h2></li>
  </ul> 
</div>


<div className='container-img-inicio'>
  <h2 style={{color: "red", border: "solid red 5px", padding: "5px", borderRadius: "10px"}}>
EN NUESTRA PLATAFORMA, ¡NO SOLO PODRÁS ENCONTRAR AMIGOS, SINO TAMBIÉN OFRECER TUS PROPIOS SERVICIOS!</h2>
  <img src={simboloAmistad2} className='img-inicio' alt="Imagen de amistad" />
</div>
</div>

<div className='container-reseñas'>
  {/* <div > */}
  <h3 className='titulo-reseña' >Reseña</h3>
{/* </div> */}

<div className='reseñas'>

</div>

<div className='container-reseña'>
  {/* <div className='input-reseña'>
<input type='text' id='nombre' onChange={handleChange} placeholder='NOMBRE' name='nombre' className='input-reseña' />
<textarea type='text' id='reseña' onChange={handleChange} placeholder='RESENA' name='resena' className='input-reseña' />
{error && <div className='error-container'>
  {error}</div>}
  {addReseña && <div className='container-exito'>
  {addReseña}</div>}
<button className='item-barnav-button' style={{marginTop: "10px", marginBottom: "10px"}} onClick={handleSubmit}>AÑADIR</button>
</div> */}
<div className='reseñas'>
{
  totalResenas.map((reseña, index) => {
    return(
<div className='reseña' key={index}>
<h1 style={{color: "rgb(8, 8, 149)"}}>{reseña.nombre}</h1>
<p style={{fontSize: "15px", color: "black"}}>{reseña.resena}</p>
</div>
   ) })
}
</div>
</div>

</div>

</div>


    </div>
  )
}

export default Hogar



{/* <div className='explication-container'>

<h2>
"AlquileGente.com ofrece una variedad de actividades para todos los gustos.</h2>
<p className='parrafo1'>A veces solo quieres alguien con quien levantar el teléfono y hablar, encontrar un amigo por teléfono es rápido y fácil.</p>
<p className='parrafo2'>Muchos de nosotros tenemos eventos familiares a los que debemos asistir todos los años. ¡Traer a alguien por mucho tiempo puede ayudar a que las cosas sean mucho más fáciles e interesantes!<NavLink to='/actividades'>actividades</NavLink>. ¡Descubre cómo puedes hacer que cada momento sea memorable para leer más.</p>
</div>
<div className='list-containers'>
<ul className='list-container'>
        <li className='item-list'>Cafe</li>
        <li className='item-list'>Musica</li>
        <li className='item-list'>Compañero de Ejercicio</li>
    </ul>

    <ul className='list-container'>
        <li className='item-list'>Amistad</li>
        <li className='item-list'>Ir al parque</li>
        <li className='item-list'>Fiestas</li>
    </ul>

    <ul className='list-container'>
        <li className='item-list'>Cenas</li>
        <li className='item-list'>Funciones Familiares</li>
        <li className='item-list'>Andar en Bicicleta</li>
    </ul>

    <ul className='list-container'>
        <li className='item-list'>Religion</li>
        <li className='item-list'>Ir de Compras</li>
        <li className='item-list'>Amigo por Correspondencia</li>
    </ul>

    <ul className='list-container'>
        <li className='item-list'>Amigos con discapacidad</li>
        <li className='item-list'>Practicar deportes</li>
        <li className='item-list'>Bailar</li>
    </ul>

    <ul className='list-container'>
        <li className='item-list'>Chofer</li>
        <li className='item-list'>Amigo Telefonico</li>
        <li className='item-list'>Yoga</li>
    </ul>

    <ul className='list-container'>
        <li className='item-list'>Viajes</li>
        <li className='item-list'>Eventos Deportivos</li>
        <li className='item-list'>Peliculas</li>
    </ul>

</div> */}