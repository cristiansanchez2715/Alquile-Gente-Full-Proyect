import React from 'react'

function ComponenteDePago({nuevoUsuario}) {
    return (
        <div>
            <h1>Eliga El Servicio que prefiere señor: {nuevoUsuario.fullname}</h1>
      <div className="container-componente-pago">
        <div className="card">
          <h1>Mes A Mes</h1>
          <h2>Obtén nuestro servicio para conocer personas y contratarlas de manera ilimitada durante un mes por tan solo</h2>
          <h1>1 Euro</h1>
          <button>Comprar</button>
        </div>
  
        <div className="card">
          <h1>Año Saludable</h1>
          <h2>Obtén nuestro servicio para conocer personas y contratarlas de manera ilimitada durante un año por tan solo</h2>
          <h1>5 Euro</h1>
          <button>Comprar</button>
        </div>
      </div>
      </div>
    );
  }
export default ComponenteDePago