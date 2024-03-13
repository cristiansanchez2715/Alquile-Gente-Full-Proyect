import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>
        &copy; {new Date().getFullYear()} CRISTIAN CAMILO MEDINA SANCHEZ. Todos los derechos reservados.
      </p>
      <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
        Al usar este sitio, aceptas nuestros <a href="/terminos-de-privacidad">Términos de Privacidad</a>.
      </p>
    </footer>
  );
}

export default Footer;