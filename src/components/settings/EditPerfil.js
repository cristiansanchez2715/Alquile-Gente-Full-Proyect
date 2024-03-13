import React from 'react'
import { useState, useRef } from 'react'


function EditPerfil({usuarioPresente, setUsuarioPresente}) {

const [change, setChange] = useState("")
const [activeInputId, setActiveInputId] = useState(null);
const blurTimeout = useRef(null);
const inputRefs = useRef([]);




const handleChange = (e) => {
setChange(e.target.value)
console.log("esto esta llegando al input: " + change)
  }

// logica inputs

const handleFocus = (inputId) => {
  setActiveInputId(inputId);
};


const handleBlur = () => {
  setTimeout(() => {
    setActiveInputId(null);
  }, 100);
};

const handleClick = (inputId) => {
  setActiveInputId(inputId);
};





const functionSendChallange = (parametro, value) => {
  fetch(`http://localhost:4000/${parametro}/cambio/${usuarioPresente.id}`, {
    method: "PUT",
    body: value,
  })
  .then(response => {
    // Verificar el estado de la respuesta
    if (response.ok) {
      // La solicitud se completó con éxito
      return response.json(); // Convertir la respuesta a JSON
      
    } else {
      // La solicitud falló, lanzar un error
      throw new Error('Error en la solicitud');
    }
  })
  .then(data => {
    // Manejar los datos de la respuesta
    console.log('esto esta saliendo del frontend: ', data);
    document.getElementById("input1").value = ""
      document.getElementById("input2").value = ""
      document.getElementById("input3").value = ""
      document.getElementById("input4").value = ""
      document.getElementById("input5").value = ""
      document.getElementById("input6").value = ""
      document.getElementById("input7").value = ""
      document.getElementById("input8").value = ""
      document.getElementById("input9").value = ""
      document.getElementById("input10").value = ""
      setChange("")
    // Realizar cualquier otra operación necesaria con los datos recibidos
  })
  .catch(error => {
    // Manejar cualquier error que pueda ocurrir durante la solicitud
    console.error('Error:', error);
  });
}



  return (
    <div>
      <div className='container-information-editperfil'>
      <h1>Desde esta seccion <span style={{color: "red"}}>USTED PODRA EDITAR</span> cierta informacion de su perfil. pero tenga en cuenta que <span style={{color: "blue"}}>DATOS BASICOS</span> como nombres y demas no son editables. </h1>
      </div>


      <div className='card-presentacion-usuario'>
      <div className='information-perfil' style={{padding: "100px"}}>  
            <h2 style={{width: "600px", textAlign: "center", marginBottom: "100px"}}>Nombre: {usuarioPresente.fullname}</h2>



            <div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>


 <h3>Ciudad: {usuarioPresente.city}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input1' className='input-editprofile' type='text' placeholder={usuarioPresente.phone} onFocus={() => handleFocus('input4')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input1')}
                disabled={activeInputId !== 'input1' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("phone", change)}>Cambiar</button>
 </div>


</div>

<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
  <div className='information-perfil'>
            <h3>Estado Civil: {usuarioPresente.civilStatus}</h3>
            </div>
            <div className='container-edit-buttons'>
            <input id='input2' className='input-editprofile' type='text' placeholder={usuarioPresente.civilStatus} onFocus={() => handleFocus('input2')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input2')}
                disabled={activeInputId !== 'input2' && change.length > 0} />
            <button className='btn-editprofile' onClick={() => functionSendChallange("civilStatus", change)}>Cambiar</button>
            </div></div>


            <div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
            <div className='information-perfil'>
      
            <h3>Correo Electrónico: {usuarioPresente.email}</h3>

 </div>
 <div className='container-edit-buttons'>
            <input id='input3' className='input-editprofile' type='text' placeholder={usuarioPresente.email} onFocus={() => handleFocus('input3')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input3')}
                disabled={activeInputId !== 'input3' && change.length > 0} />
            <button className='btn-editprofile' onClick={() => functionSendChallange("email", change)}>Cambiar</button>
            </div>


</div>




<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Teléfono: {usuarioPresente.phone}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input4' className='input-editprofile' type='text' placeholder={usuarioPresente.phone} onFocus={() => handleFocus('input4')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input4')}
                disabled={activeInputId !== 'input4' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("phone", change)}>Cambiar</button>
 </div>


</div>


            

<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Intereses Personales: {usuarioPresente.personalInteres}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input5' className='input-editprofile' type='text' placeholder={usuarioPresente.personalInteres} onFocus={() => handleFocus('input5')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input5')}
                disabled={activeInputId !== 'input5' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("personalInteres", change)}>Cambiar</button>
 </div>


</div>



<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Intereses de Búsqueda: {usuarioPresente.searchInteres}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input6' className='input-editprofile' type='text' placeholder={usuarioPresente.searchInteres} onFocus={() => handleFocus('input6')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input6')}
                disabled={activeInputId !== 'input6' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("searchInteres", change)}>Cambiar</button>
 </div>


</div>
            

            
<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Actividad Favorita: {usuarioPresente.favoriteActivity}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input7' className='input-editprofile' type='text' placeholder={usuarioPresente.favoriteActivity} onFocus={() => handleFocus('input7')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input7')}
                disabled={activeInputId !== 'input7' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("favoriteActivity", change)}>Cambiar</button>
 </div>


</div>
            


<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Gusto Musical: {usuarioPresente.musicalTaste}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input8' className='input-editprofile' type='text' placeholder={usuarioPresente.favoriteActivity} onFocus={() => handleFocus('input8')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input8')}
                disabled={activeInputId !== 'input8' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("favoriteActivity", change)}>Cambiar</button>
 </div>


</div>


<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Gusto Musical: {usuarioPresente.musicalTaste}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input9' className='input-editprofile' type='text' placeholder={usuarioPresente.favoriteActivity} onFocus={() => handleFocus('input9')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input9')}
                disabled={activeInputId !== 'input9' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("favoriteActivity", change)}>Cambiar</button>
 </div>


</div>



<div className='container-item-edit-profile' style={{marginLeft: "-65px", marginTop: "-50px"}}>
 
 <div className='information-perfil'>

 <h3>Vive Con: {usuarioPresente.whoDoYouLive}</h3>

</div>
<div className='container-edit-buttons'>
 <input id='input10' className='input-editprofile' type='text' placeholder={usuarioPresente.whoDoYouLive} onFocus={() => handleFocus('input10')} onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => handleClick('input10')}
                disabled={activeInputId !== 'input10' && change.length > 0} />
 <button className='btn-editprofile' onClick={() => functionSendChallange("whoDoYouLive", change)}>Cambiar</button>
 </div>


</div>



          </div>
      </div>
      </div>
  )
}

export default EditPerfil