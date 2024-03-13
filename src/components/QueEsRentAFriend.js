import React from 'react'
import { NavLink } from 'react-router-dom'
import imgEstrechon from '../assets/estrechondemanos.png'
import IMG1 from '../assets/servicios-logos/imagen1.png'
import IMG2 from '../assets/servicios-logos/imagen2.png'
import IMG3 from '../assets/servicios-logos/imagen3.jpg'
import IMG4 from '../assets/servicios-logos/imagen4.jpg'
import IMG5 from '../assets/servicios-logos/imagen5.png'
import IMG6 from '../assets/servicios-logos/imagen6.png'
import IMG7 from '../assets/servicios-logos/imagen7.jpg'
import IMG8 from '../assets/servicios-logos/imagen8.png'


function QueEsRentAFriend() {
  return (
    <div className='container-queesrentafriend'>
      <h3 className='parrafo3'>
      Alquile Gente es tu nuevo destino para encontrar compañía personalizada y de confianza. Con cientos de compañeros disponibles, estamos aquí para brindarte el apoyo y la compañía que necesitas, justo cuando lo necesitas. Descubre cómo Alquile Gente puede hacer que cada momento sea más memorable.
      </h3>
<div style={{display: "flex", flexDirection: "row"}}>
  <div>
      <p className='parrafo-quees'>
Lugar indicado para aquellas personas que buscan generar fraternidad con alguien, desean de conocer gente nueva para vivir experiencias nuevas e inolvidables.</p>


      <p className='parrafo-quees'>
      Puede ser en tu ciudad natal o puedes encontrarte de viaje, no  lo dudes que AlquileGente se convertira en una herramienta muy util para encontrar personas con gustos afines a los tuyos
      </p>
      </div>

      <div>
        <p></p>
        <img className='img-explicacion' src={imgEstrechon} />
      </div>

      </div>
       <h2 className='parrafo-quees'>
       {/* Imagina las posibilidades: */}
   
       </h2>

       <div className='grid-container'>
  <div className='card'>
    <div className='card-content'>
      <h1>Senderismo</h1>
      <p>Disfruta de la naturaleza mientras exploras rutas fascinantes.</p>
    </div>
    <div className='card-image'>
      <img src={IMG1} alt="Senderismo" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Pintura</h1>
      <p>Despierta tu creatividad y da vida a tus ideas a través del arte.</p>
    </div>
    <div className='card-image'>
      <img src={IMG2} alt="Pintura" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Juegos</h1>
      <p>Diviértete y socializa con amigos mientras disfrutas de diferentes juegos.</p>
    </div>
    <div className='card-image'>
      <img src={IMG3} alt="Juegos" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Cocina</h1>
      <p>Explora nuevos sabores y aprende a cocinar platos deliciosos.</p>
    </div>
    <div className='card-image'>
      <img src={IMG4} alt="Cocina" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Lectura</h1>
      <p>Sumérgete en historias fascinantes y amplía tus horizontes culturales.</p>
    </div>
    <div className='card-image'>
      <img src={IMG5} alt="Lectura" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Yoga</h1>
      <p>Encuentra paz interior y mejora tu salud física y mental con el yoga.</p>
    </div>
    <div className='card-image'>
      <img src={IMG6} alt="Yoga" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Voluntariado</h1>
      <p>Contribuye a hacer del mundo un lugar mejor ayudando a los demás.</p>
    </div>
    <div className='card-image'>
      <img src={IMG7} alt="Voluntariado" />
    </div>
  </div>

  <div className='card'>
    <div className='card-content'>
      <h1>Bicicleta</h1>
      <p>Explora nuevos lugares y mantente en forma mientras disfrutas de paseos en bicicleta.</p>
    </div>
    <div className='card-image'>
      <img src={IMG8} alt="Bicicleta" />
    </div>
  </div>
</div>

      {/* <button className='btn-quees' id='miranos-btn'><h3>MIRANOS EN LA TV</h3></button> */}
    </div>
    
  )
}

export default QueEsRentAFriend