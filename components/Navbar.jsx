import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificamos si el token de acceso está presente en el localStorage
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Si hay un token, el usuario está logueado
  }, []);

  const handleLogout = () => {
    // Eliminamos los tokens del localStorage al cerrar sesión
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/'); // Redirigimos a la página principal después de cerrar sesión
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">Nombre_emprendimiento</Link>
      </div>
      <input 
        type="text" 
        placeholder="Empieza tu búsqueda" 
        className="search-bar" 
      />
      <div className="menu">
        <Link to="/">Catalogo</Link>
        
        {isLoggedIn ? (
          <>
            <Link to="/profile">Mi perfil</Link> {/* Enlace al perfil */}
            <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;