import React from 'react'
import homeroImg from '../../assets/homero.png'
import { useState, useEffect } from 'react'
import axios from 'axios';
// import imgPerfil from '../../server/uploads/imagen1'
// import { imgPerfil } from '../IniciarSesion';
import { getImgPerfil } from '../IniciarSesion';
// import imgPrueba from '../../server/uploads/1709064269415-imagen1.jpg'si pila que el problema es el enlace constuido dinamicamente
// ahora si ya entendi, pensaba que el problema era que no encontraba la ruta
import { cargarImagen } from '../IniciarSesion';
import imgPrueba from '../../server/uploads/1709088976002-usuarioConectado.png'


function Perfil({setUsuarioPresente, usuarioPresente}) {
const [fileState, setFileState] = useState({imagen: null})
const [loadImage, setLoadImage] = useState("")
const [usuarios, setUsuarios] = useState([])
const [imagenUsuario, setImagenUsuario] = useState()
const [urlImagePerfil, setUrlImagePerfil] = useState(null)
const [visibilityPerfilPhoto, setVisibilityPerfiPhoto] = useState(false)
const imgP = `http://localhost:4000/public/uploads/`
const [img, setImg] = useState("");
//const [stateImg, setStateImg] = useState(`${imgP}${imagenUsuario}`)acelo correr tu aplicacion 
// ya esta corriendo en el front y en el back

// const imgPerfil =`http://localhost:4000/uploads/${imagenUsuario}`

// traer foto de perfil del usuario
const functionTraerFotoDelPerfil = () => {
  fetch(`http://localhost:4000/traerUsuarios`)
    .then(res => res.json())
    .then(data => {
      const usuario = data.find(user => user.id === usuarioPresente.id);
      if (usuario) {
      //   setImg(img + usuario.imagen);
        setImagenUsuario(usuario.imagen)
        console.log("esto es lo que esta llegando a imagenUsuario: " + imagenUsuario)
        // setImg(imgP + imagenUsuario)
        setImg(`http://localhost:4000/public/uploads/${imagenUsuario}`)
        setVisibilityPerfiPhoto(true)
      }
console.log(imagenUsuario + 'Esta es la imagen')

        console.log("este es un test", imagenUsuario)
        // console.log("esta es la imagen de usuario que esta llegando al frontend: " + imagenUsuario)
      // } else {
      //   console.error("La imagen del usuario no está definida o el usuario no se encontró en la lista");
      // }
    })
    .catch(error => console.error("Error al obtener la lista de usuarios:", error));
}


// useEffect(() => {
//   functionTraerFotoDelPerfil()
// }, [])

useEffect(() => {
  functionTraerFotoDelPerfil();
}, []);

const perfilFoto = ("./../../server/uploads/" + imagenUsuario)

useEffect(() => {
  if (imagenUsuario) {
    setUrlImagePerfil(`../../server/uploads/${imagenUsuario}`);
    setVisibilityPerfiPhoto(true);
    console.log("Esta es la ruta de la foto:", perfilFoto);
    
    // Aquí puedes forzar el renderizado
    // forceUpdate(); // Si estás en un componente de clase
    // O simplemente forceUpdate() si estás en un componente funcional
  }
}, [imagenUsuario]);// document.querySelector("#root > div.container-perfil > div > div.container-img-perfil > img:nth-child(2)")

const handleChange = (e) => {
setFileState({imagen: e.target.files[0]})
setLoadImage("Imagen Cargada")
}


// 
useEffect(() => {
  console.log("este es el numero de solicitudes de este usuario: " + usuarioPresente.solicitudes)
}, [usuarioPresente])




// creando objeto formdata


const handleSubmitImage = () => {
  if (!fileState.imagen) {
    alert("Seleccione un Archivo");
    return;
  }

  const formData = new FormData();
  formData.append('imagen', fileState.imagen);

  fetch(`http://localhost:4000/enviarImagen/${usuarioPresente.id}`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json()) // Parsear la respuesta como JSON
  .then(data => {
    console.log("imagen enviada a la BD", data.fileName);
    // Actualizar usuarioPresente.imagen con el nombre de archivo de la imagen guardada en el servidor
    setUsuarioPresente({ ...usuarioPresente, imagen: data.fileName });
  })
  .catch(err => console.error("error al subir imagen", err));

  setLoadImage("Imagen Enviada");
  setFileState({ imagen: "" });
}

// const imgPerfil = `http://localhost:4000/uploads/${imagenUsuario}` 
// const concat = imgPerfil + imagenUsuario
// const imgH = '../../assets/homero.png'

const backgroundImageStyle = {
  backgroundImage: `url(${getImgPerfil(imagenUsuario)})`, // Agregar "url()"
backgroundSize: "100%, 100%",
backgroundRepeat: "no-repeat",
  width: '200px',
  height: '200px',
};

const ruta = `http://localhost:4000/public/uploads/${imagenUsuario}`

    return (
      <div className='container-perfil'>
        <div className='card-presentacion-usuario'>
          <div className='information-perfil'>  
            <h1>Nombre: {usuarioPresente.fullname}</h1>
            <h2>Ciudad: {usuarioPresente.city}</h2>
            <p>Estado Civil: {usuarioPresente.civilStatus}</p>
            <p>Correo Electrónico: {usuarioPresente.email}</p>
            <p>Teléfono: {usuarioPresente.phone}</p>
            <p>Intereses Personales: {usuarioPresente.personalInteres}</p>
            <p>Intereses de Búsqueda: {usuarioPresente.searchInteres}</p>
            <p>Actividad Favorita: {usuarioPresente.favoriteActivity}</p>
            <p>Gusto Musical: {usuarioPresente.musicalTaste}</p>
            <p>Cantidad de Reseñas: {usuarioPresente.resenas}</p>
            <p>Cantidad de Solicitudes: {usuarioPresente.solicitudes}</p>
            <p>Cantidad de Servicios: {usuarioPresente.servicios}</p>
            <p>Vive Con: {usuarioPresente.whoDoYouLive}</p>
            <p>Consume Alcohol: {usuarioPresente.alcoholimetro}</p>
          </div>
  
          <div className='container-img-perfil'>
        {/* { !usuarioPresente.image  ? <img src={perfilFoto} className='img-perfil' alt='Imagen de perfil' /> : <img  className='img-perfil' src={usuarioPresente.imagen} />} */}
    
      
      {/* <img className='img-perfil' src={ruta} alt='Imagen de perfil' />  */}
    {visibilityPerfilPhoto && <img className='img-perfil' src={`http://localhost:4000/public/uploads/${usuarioPresente.imagen}`} alt='No cargo F'/>} 
 {/* {visibilityPerfilPhoto &&  <div style={backgroundImageStyle}></div> }  */}
    {  !usuarioPresente.imagen && <div className='subir-fotodeperfil' style={{marginTop: "50px" ,display: "flex", flexDirection: "column"}}>
            <input type='file' onChange={handleChange} name='imagen' />
            <button onClick={() => handleSubmitImage()}>Subir imagen</button>
            {
              loadImage && <div className='container-exito'>{loadImage}</div>
            }
            </div>}
            <h2>Información Bancaria:</h2>
            <p>IBAN: {usuarioPresente.iban}</p>
            <p>Método de Pago: {usuarioPresente.payMethod || 'No especificado'}</p>
            <h2>Seguridad:</h2>
            <p>Pregunta Secreta: {usuarioPresente.secretAsk}</p>
            <p>Contraseña Confirmada: {usuarioPresente.confirm_password}</p>
          </div>
        </div>
      </div>
  )
}

export default Perfil