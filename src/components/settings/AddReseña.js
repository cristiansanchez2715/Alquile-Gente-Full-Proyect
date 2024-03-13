import React, { useState } from 'react'
import { useEffect } from 'react'

function AddReseña({usuarioPresente}) {
    const [challangeForm, setChallangeForm] = useState({nombre: usuarioPresente.email, resena: ""})
    const [totalResenas, setTotalResenas] = useState([])
    const [error, setError] = useState("")
    const [addReseña, setAddReseña] = useState("")
    const [newResena, setNewResena] = useState(0)
    const [totalUsuarios, setTotalUsuarios] = useState([])


// traerUsuarios

const getUsers = () => {
    fetch("http://localhost:4000/traerUsuarios").then(res => res.json()).then(data => setTotalUsuarios(data))
}

const comprobationResenas = () => {
    if(usuarioPresente.resena > 1){
        setError("lo siento usted ya ha puesto una reseña")
    }
    else{
        functionComprobandoReseña()
    }
}

    
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
    <div>
        <div style={{marginTop: "100px", marginLeft: "400px"}} className='container-reseña-create'>
    <div className='input-reseña'>
  <input type='text' id='nombre' onChange={handleChange} placeholder='NOMBRE' className='input-reseña' />
  <textarea type='text' id='reseña' onChange={handleChange} placeholder='RESENA' name='resena' className='input-reseña' />
  {error && <div className='error-container'>
    {error}</div>}
    {addReseña && <div className='container-exito'>
    {addReseña}</div>}
  <button className='item-barnav-button' style={{marginTop: "10px", marginBottom: "10px"}} onClick={comprobationResenas}>AÑADIR</button>
  </div>
  <div className='reseñas'>
  {
    totalResenas.map((reseña, index) => {
      return(
  <div className='reseña-create' key={index}>
  <h1 style={{color: "rgb(8, 8, 149)"}}>{reseña.nombre}</h1>
  <p style={{fontSize: "15px", color: "black"}}>{reseña.resena}</p>
  </div>
     ) })
  }
  </div>
  </div>
  
  </div>
  
  
  )
}

export default AddReseña