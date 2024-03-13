import React from 'react'
import { useState, useEffect } from 'react'
import imgBarNav from '../../assets/not-found/logo-removebg-preview.png'


function RecoverPassword() {
  const [visibility1, setVisibility1] = useState(true)  
  const [visibility2, setVisibility2] = useState(false)
  const [visibility3, setVisibility3] = useState(false)
  const [challangeInput, setChallangeInput] = useState()
  const [totalUsuarios, setTotalUsuarios] = useState([])
  const [error, setError] = useState("") 
  const [userPresent, setUserPresent] = useState()
  const [answerUser, setAnswerUser] = useState("")
const [intentos, setIntentos] = useState(0)
const [newPassword, setNewPassword] = useState("")
const [visibilityWindow, setVisibilityWindow] = useState(false)


// parte 1 del componente, comprobar si el correo electronico existe en la bd

const getUsuarios = () => {
  fetch("http://localhost:4000/traerUsuarios").then(res => res.json()).then(data => setTotalUsuarios(data))
}


  const challangeFunction = (e) => {
setChallangeInput(e.target.value)
  }


  useEffect(() => {
getUsuarios()
  }, [])
  
const functionComprobationEmailUserExistInDataBase = (e) => {
  e.preventDefault()
const userExist = totalUsuarios.find((user) => {
  return user.email === challangeInput
})
if(userExist){
  setVisibility2(true)
  setVisibility1(false)
  setUserPresent(userExist)
  setError("")
}
else{
   setError("Este Correo Electronico no esta registrado") 
}
}

// parte 2 del componente comprobar respuesta secreta

const challangeAnswerUser = (e) => {
setAnswerUser(e.target.value)

}

const comprobateAnswer = (e) => {
const answerCorrect = userPresent.secretAnswer

if(intentos < 4){

if(answerUser === answerCorrect){
  e.preventDefault()
  setVisibility3(true)
  setVisibility2(false)
  setVisibility1(false)
  setError("")
}
else{
  setError("La Respuesta no Coincide")
  setIntentos(intentos + 1)
}

}
else if(intentos >= 4){
setError("Tiene mas de 3 intentos.")
}
}


// parte 3 del componente crear una nueva contraseña y enviarla a la bd

const challangeNewPassword = (e) => {
  setNewPassword(e.target.value)
}
 

// FUNCIONES DE RETORNO

const functionShow1 = () => {
  return(
  <form className='form-recoverpassword-container' onSubmit={(e) => functionComprobationEmailUserExistInDataBase(e)}>
  
  <div  className='logo-container2' id='logo-form' style={{marginLeft: "0px",fontSize: "35px" ,display: "flex", flexDirection: "row", marginTop: "-100px"}}>
  <h2><span style={{color: "red",} }>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
    <img src={imgBarNav} className='img-form' />
</div>
  
  <h3>Digite su correo electronico</h3>
  <input onChange={challangeFunction} />
<button className='btn-recoverpassword' type='submit'>Comprobar</button>
{error && <div className='error-container'>
  <h1>{error}</h1>
  </div>}
</form>
)
}


const functionShow2 = () => {
 


return(
  <div className='form-recoverpassword-container'>


<div  className='logo-container2' id='logo-form' style={{marginLeft: "0px",fontSize: "35px" ,display: "flex", flexDirection: "row", marginTop: "-100px"}}>
  <h2><span style={{color: "red",} }>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
    <img src={imgBarNav} className='img-form' />
</div>


    <div>
    <h2 style={{color: "blue"}}>Pregunta secreta: <span style={{color: "red"}}> {userPresent.secretAsk}</span></h2>
    </div>

<div style={{display: "flex", flexDirection: "column"}}>
  <label style={{marginBottom: "20px", color: "white", fontSize: "18px"}}>Introduzca la respuesta:</label>
    <input onChange={challangeAnswerUser}></input>
    <button className='btn-recoverpassword' onClick={(e) => comprobateAnswer(e)}>Comprobar</button>
    {error && <div className='error-container'>
      <h3>{error}</h3>
      </div>}
    </div>
  </div>
  )
}

const functionShow3 = () => {
return(

  <div className='form-recoverpassword-container'>


<div  className='logo-container2' id='logo-form' style={{marginLeft: "0px",fontSize: "35px" ,display: "flex", flexDirection: "row", marginTop: "-100px"}}>
  <h2><span style={{color: "red",} }>!Alquile </span><span style={{color: "blue"}}>Gente¡</span> </h2>
    <img src={imgBarNav} className='img-form' />
</div>


    <h2>Por favor introduzca su <span style={{color: "red"}}>NUEVA CONTRASEÑA</span></h2>
    <input onChange={challangeNewPassword} />
    <button className='btn-recoverpassword' onClick={() => visibilityWindowComprobation()}>Enviar</button>

    {visibilityWindow && windowComprobation()}
  </div>
)

}

const visibilityWindowComprobation = () => {
  setVisibilityWindow(true)
  setError("")
}

const closeWindowComprobation = () => {
  setVisibilityWindow(false)
}

const windowComprobation = () => {
  return(
    <div className='windowComprobationContainer'>
      <div className='container-button-close-comprobation'>
        <button className='btn-close-challangepassword' onClick={closeWindowComprobation} style={{ marginLeft: "375px", backgroundColor: "#2ecc71", height: "22px"}}>X</button>
      </div>
      <div>
        <div  style={{marginTop: "100px"}}>
          <h1>Esta seguro que desea cambiar su contraseña a {newPassword} ?</h1>
        </div>

        <div style={{ gap: "50px" ,display: "flex", flexDirection: "row", marginLeft: "100px", marginTop: "50px"}}>
          <button className='btn-recoverpassword'>Aceptar</button>
          <button className='btn-recoverpassword' onClick={closeWindowComprobation}>Cancelar</button>
        </div>
      </div>

    </div>
  )
}

// RETORNO PRINCIPAL COMPONENTE

  return (
    <div>
      {visibility1 && functionShow1()}
      {visibility2 && functionShow2()}
      {visibility3 && functionShow3()}
    </div>
  )
}

export default RecoverPassword
