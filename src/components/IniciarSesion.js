import React from 'react'
import imgKey from '../assets/llave.png'
import imgCorreo from '../assets/correoElectronico.png'
import { NavLink } from 'react-router-dom'
import imgFooter from '../assets/rentafriendfooter.png'
import { useState, useEffect } from 'react'
import imgBarNav from '../assets/not-found/logo-removebg-preview.png'
import { useNavigate } from 'react-router-dom'


function IniciarSesion({usuarioPresente, setUsuarioPresente, setSesionIniciada}) {
const [totalUsuarios, setTotalUsuarios] = useState([])

  // var imgPerfil = `http://localhost:4000/uploads/${usuarioPresente.imagen}` 
const navigate = useNavigate()

  const [challangeForm, setChallangeForm] = useState({email: "", password: ""})
  const [error, setError] = useState("")
  const [exito, setExito] = useState("")
  


// OBTENER USUARIOS DE LA API

const getUsuarios = () => {
  fetch("http://localhost:4000/traerUsuarios")
  .then(res => res.json())
  .then(data => { setTotalUsuarios(data);
  // console.log("vamos a ver si se desencripto correctamente estos son los usuarios: " + data);
}
)
}

useEffect(() => {
getUsuarios()
}, [])



  // logica inicio de sesion


useEffect(() => {
  console.log(totalUsuarios)
  }, [totalUsuarios])
  
const iniciarSesionFunction = (e) => {
  e.preventDefault()
  const userExist = totalUsuarios.find((usuario) => {
    return usuario.email === challangeForm.email
  })

  if(userExist){
    if(userExist.password === challangeForm.password){
      setSesionIniciada(true)
      setExito("sesion iniciada correctamente")
      setError("")
      setUsuarioPresente(userExist)
      console.log(userExist)
      navigate('/perfil')
    }
    else{
      setError("Contraseña invalida")
      setExito("")
    }
  }
  else{
    setError("Email no Registrado")
    setExito("")
  }

document.getElementById("email").value = ""
document.getElementById("password").value = ""

}


// logica captura formulario


const handleChange = (e) => {
  const { name, value } = e.target;
  setChallangeForm(prevState => ({
    ...prevState,
    [name]: value
  }));
};




  return (
    <div className='container-form-iniciarsesion'>
<form className='container-form'>
<div  className='logo-container2' id='logo-form' style={{marginLeft: "275px",fontSize: "35px" ,display: "flex", flexDirection: "row", paddingTop: "50px"}}>
  <h2><span style={{color: "red",} }>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
    <img src={imgBarNav} className='img-form' />
</div>

<div className='container-input'>
  <img src={imgCorreo} className='imagen-input' />
  <input onChange={handleChange} className='input-iniciarsesion' name='email' id='email' placeholder='Correo Electronico'></input>
</div>

<div className='container-input'>
  <img src={imgKey} className='imagen-input' />
  <input onChange={handleChange} className='input-iniciarsesion' type='text' id='password' name='password' placeholder='Contraseña'></input>
</div>
<div className='container-radio-navlink'>
  <NavLink to='/recuperarPassword'>Olvidaste tu Contraseña?</NavLink>
</div>

<div>
  <button className='btn-acceso' onClick={iniciarSesionFunction}><h3>Acceso</h3></button>
  <p><NavLink to='/registro' className='noesunmiembro'>¿No es un miembro? Únete aqui</NavLink></p>
</div>

<div className='container-footer-frase'>
Protegido por reCAPTCHA y se aplican la Política de privacidad y los Términos de servicio de Google .
</div>

<div className='container-exito-iniciarsesion'>
{exito && <h3>
  {exito}</h3>} </div>

  <div className='error-container-iniciarsesion'>
{
  error && <h3>
{error}
  </h3>
}</div>

</form>
{/* 
<div className='container-footer'>
  <div className='container1-footer'>
    <div>
      <img className='img-footer' src={imgFooter} />
    </div>
    <div>
      <nav className='container-barnav-footer1'>
        <h5 className='item-barnavfooter1'>HOGAR</h5>
        <h5 className='item-barnavfooter1'>QUE ES RENT A FRIEND?</h5>
        <h5 className='item-barnavfooter1'>ENCUENTRA UN AMIGO</h5>
        <h5 className='item-barnavfooter1'>INICIAR SESION</h5>
      </nav>
      <nav className='container-barnav-footer1'>
        <h5 className='item-barnavfooter1'>INSCRIBIRSE</h5>
        <h5 className='item-barnavfooter1'>TESTIMONIOS</h5>
        <h5 className='item-barnavfooter1'>ACTIVIDADES</h5>
        <h5 className='item-barnavfooter1'>BLOG</h5>
        <h5 className='item-barnavfooter1'>PRENSA</h5>
        <h5 className='item-barnavfooter1'>Preguntas Frecuentes</h5>
        <h5 className='item-barnavfooter1'>CONTACTO</h5>
        
      </nav>
    </div>
  </div>
  <div className='container2-footer'>
<div className='container-subscribirse-footer'>
  <h1>SUBSCRIBASE A NUESTRO BOLETIN</h1>
  <p>Regístrese para recibir nuestro boletín mensual para mantenerse informado de nuevos cambios y actualizaciones.</p>
  <div>
    <input type='text' placeholder='Direccion de correo electronico' className='input-footer' />
    <button className='btn-subscribit-footer'>Subscribir</button>
  </div>
</div>
<div className='haga-click'>
  HAGA CLICK AQUI PARA CONVERTIRSE EN AMIGO Y RECIBIR SU PAGO
</div>

  </div>
</div>
<div className='end-footer'>
  <p className='end-footer-item'>Copyright @2023 RentAFriend.com | Reservados todos los derechos</p>
  <p className='end-footer-item'>El uso de este sitio constituye la aceptacion de nuestros Terminos y nuestra Politica de privacidad.</p>
</div> */}

    </div>
  )
}

function getImgPerfil(usuario) {
  const perfilFoto = ("../server/uploads/" + usuario)

  return perfilFoto;
  
}

export {IniciarSesion as default, getImgPerfil}