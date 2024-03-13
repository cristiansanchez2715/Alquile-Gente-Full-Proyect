import React from 'react'
import IMG1 from '../../assets/not-found/usuarioConectado-removebg-preview.png'
import { useState } from 'react'
function Chat({setVisibilityChat, personasDePrueba}) {
    const [mensajesDePrueba, setMensajesDePrueba] = useState([])
    const [captureMessage, setCaptureMessage] = useState({message: ""})


// visibilidad chat

  const functionCloseChat = () => {
    setVisibilityChat(false)
  }
 
const onChangeF = (e) => {
   setCaptureMessage({message: e.target.value}) 
}

const sendMessage = () => {
    setMensajesDePrueba(mensajesPrueba => [...mensajesDePrueba, captureMessage])
}

    return (


    <div className='chat-container'>
 <div className='usersConected-container'>
            <h4 className='contactos-title'>Contactos</h4>
            <ul>
{
    personasDePrueba.map((persona, index) => {
return(
    <li className='people-conected' key={index}>
   <p className='people-conected-item'>{persona.nombre}</p><div className='container-icon-user-conected'> <img src={IMG1} className='icon-user-conected' /> </div>
    </li>
)
    })
    
    
}
</ul>
        </div>
      

        <div className='textandwrite-container'>
<div className='text'>
<ul>
{mensajesDePrueba.map((mensaje, index) => {
return(
    <li className='messages-prueba' key={index}>
      usuario1 dice: {mensaje.message}
    </li>
)
})}
</ul>
</div>
<div className='input-message-container'>
<textarea onChange={onChangeF} className='input-messages' />
<button onClick={() => sendMessage()} className='btn-enviar'>🥹
</button>
</div>

<div className='container-btn-close-chat'>
<button onClick={() => functionCloseChat()} className='btn-close-chat'>X</button>
</div>

        </div>
      
    </div>
  )
}

export default Chat