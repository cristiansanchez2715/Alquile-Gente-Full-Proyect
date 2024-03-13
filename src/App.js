import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import BarNav from './components/BarNav';
import QueEsRentAFriend from './components/QueEsRentAFriend'
import IniciarSesion from './components/IniciarSesion';
import Hogar from './components/Hogar';
import UneteAhora from './components/UneteAhora'
import React from 'react';
import Actividades from './components/Actividades';
// import Reset from './components/Reset';
import Prensa from './components/Prensa';
import AlquilarPersonasFree from './components/AlquilarPersonasFree';
import BarNav2 from './components/BarNav2.js/BarNav2';
import Buscar from './components/BarNav2.js/Buscar';
import CrearServicio from './components/BarNav2.js/CrearServicio';
import { useState, useEffect } from 'react';
import Chat from './components/BarNav2.js/Chat';
import Perfil from './components/BarNav2.js/Perfil';
import Ayuda from './components/Ayuda';
import CrearSolicitud from './components/BarNav2.js/CrearSolicitud';
import SolicitarPersonas from './components/SolicitarPersonas';
import RecoverPassword from './components/settings/RecoverPassword';
import Error from './components/settings/Error';
import DeleteUser from './components/settings/DeleteUser';
import Publicaciones from './components/settings/Publicaciones';
import EditPerfil from './components/settings/EditPerfil';
import Footer from './components/Footer';
import Settings from './components/settings/Settings';
import AddReseña from './components/settings/AddReseña';

function App() {
 // estados de prueba para el frontend
 const [personasDePrueba, setPersonasDePrueba] = useState()
 const [serviciosDisponibles, setServiciosDisponibles] = useState([])
 const [solicitudesDisponibles, setSolicitudesDisponibles] = useState([])
const [nuevoUsuario, setNuevoUsuario] = useState()
 
// login

const [sesionIniciada, setSesionIniciada] = useState(false)
const [usuarioPresente, setUsuarioPresente] = useState()
const [totalUsuarios, setTotalUsuarios] = useState([])

// visibilidades

const [visibilityChat, setVisibilityChat] = useState(false)
const [visibilityHelp, setVisibilityHelp] = useState(false)
const [visibilityLogIn, setVisibilityLogIn] = useState(false)
const [visibilityBarNav2, setVisibilityBarNav2] = useState(false)


// ruta imagen perfil usuario


  // CONEXIONES BACKEND

  // TRAER SERVICIOS DESDE LA API

  const getServices = () => {
    fetch("http://localhost:4000/traerServicios")
    .then(res => res.json())
    .then(data => setServiciosDisponibles(data))
  }

useEffect(() => {
getServices()
}, [])



  // TRAER SOLICITUDES DESDE LA API

  const getSolicitudes = () => {
    fetch("http://localhost:4000/traerSolicitudes")
    .then(res => res.json())
    .then(data => setSolicitudesDisponibles(data))
  }

useEffect(() => {
getSolicitudes()
}, [])

// TRAER USUARIOS DESDE LA API



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



  const personas = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      descripcion: 'Estudiante de medicina interesado en la investigación científica.',
      ciudad: 'Buenos Aires',
      edad: 25
    },
    {
      nombre: 'María',
      apellido: 'González',
      descripcion: 'Apasionada por el arte y la música, disfruto de los viajes y la naturaleza.',
      ciudad: 'Madrid',
      edad: 30
    },
    {
      nombre: 'Carlos',
      apellido: 'López',
      desecripcion: 'Ingeniero de software con experiencia en desarrollo web y móvil.',
      ciudad: 'México DF',
      edad: 28
    },
    {
      nombre: 'Laura',
      apellido: 'Martínez',
      descripcion: 'Chef profesional especializada en cocina mediterránea y postres.',
      ciudad: 'Barcelona',
      edad: 35
    }
  ];

 
// funcion visibilidad barnav2

const functionVisibilityBarnav2 = () => {
  setVisibilityBarNav2(!visibilityBarNav2)
}

// test prueba formulario de registro frontend

useEffect(() => {
  console.log(nuevoUsuario)
  }, [nuevoUsuario])
  
 

  return (
    <BrowserRouter>
    <div className="App">
      <React.Fragment>
        <BarNav usuarioPresente={usuarioPresente} setSesionIniciada={setSesionIniciada} sesionIniciada={sesionIniciada} functionVisibilityBarnav2={functionVisibilityBarnav2} visibilityLogIn={visibilityLogIn} setVisibilityLogIn={setVisibilityLogIn} setVisibilityChat={setVisibilityChat} setVisibilityHelp={setVisibilityHelp} visibilityHelp={visibilityHelp} />
      {(visibilityBarNav2 && sesionIniciada) &&  <BarNav2 setVisibilityChat={setVisibilityChat} setVisibilityHelp={setVisibilityHelp} visibilityChat={visibilityChat} />
       } 
       {visibilityChat && <Chat  personasDePrueba={personasDePrueba} setVisibilityChat={setVisibilityChat} />}
        {visibilityHelp && <Ayuda />}
        
      </React.Fragment>
      
    </div>

    <Routes>
      <Route element={<Hogar usuarioPresente={usuarioPresente} visibilityLogIn={visibilityLogIn} />} path='/'></Route>
      <Route element={<QueEsRentAFriend />} path='/quees'></Route>
      <Route element={<IniciarSesion usuarioPresente={usuarioPresente} setUsuarioPresente={setUsuarioPresente} setTotalUsuarios={setTotalUsuarios} totalUsuarios={totalUsuarios} setSesionIniciada={setSesionIniciada} /> } path='/iniciarsesion'></Route>
      <Route element={<UneteAhora totalUsuarios={totalUsuarios} nuevoUsuario={nuevoUsuario} setNuevoUsuario={setNuevoUsuario}/>} path='/registro'></Route>
      <Route element={<Actividades />} path='/actividades'></Route>
      <Route element={<Prensa />} path='/prensa'></Route>
      <Route 
  path='/freealquilerpersona'
  element={sesionIniciada ? <AlquilarPersonasFree serviciosDisponibles={serviciosDisponibles} /> : <Error />}
/>
      <Route element={<Buscar personasDePrueba={personasDePrueba} />} path='/search'></Route>
      <Route element={<CrearServicio setUsuarioPresente={setUsuarioPresente} usuarioPresente={usuarioPresente}  serviciosDisponibles={serviciosDisponibles} setServiciosDisponibles={setServiciosDisponibles} />} path='/crearServicio'></Route>
      <Route element={<Perfil setUsuarioPresente={setUsuarioPresente} usuarioPresente={usuarioPresente} />} path='/perfil'></Route>
      <Route element={<CrearSolicitud usuarioPresente={usuarioPresente} solicitudesDisponibles={solicitudesDisponibles} setSolicitudesDisponibles={setSolicitudesDisponibles} /> } path='/crearSolicitud' ></Route> 
      <Route element={<SolicitarPersonas solicitudesDisponibles={solicitudesDisponibles} />}  path='/solicitarPersonas'></Route> 
       <Route element={<RecoverPassword />} path='/recuperarPassword'></Route>
       <Route element={<Error />} path='/error'></Route>
       <Route element={<EditPerfil setUsuarioPresente={setUsuarioPresente} usuarioPresente={usuarioPresente}  />} path='/editarPerfil'></Route>
       <Route element={<DeleteUser />} path='/borrarUsuario'></Route>
       <Route element={<Publicaciones usuarioPresente={usuarioPresente} />} path='/publicaciones' ></Route>
       <Route element={<Settings />} path='/settings'></Route>
       <Route element={<AddReseña usuarioPresente={usuarioPresente} />} path='/addresena'></Route>
    </Routes>
    <React.Fragment >
    <Footer />
    </React.Fragment>

    </BrowserRouter>
  );
  

}

export default App;
