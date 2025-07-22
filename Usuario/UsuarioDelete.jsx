import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario } from '../../services/UsuarioService';
import Alert from '../../components/shared/Alert';

function UsuarioDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    try {
      const res = await getUsuarios();
      const user = res.data.find(u => u.id === parseInt(id));
      if (user) {
        setUsuario(user);
      } else {
        setAlert({ message: 'Usuario no encontrado', type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'Error al cargar usuario', type: 'danger' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUsuario(id);
      setAlert({ message: 'Usuario eliminado correctamente', type: 'success' });
      setTimeout(() => navigate('/usuarios'), 1500);
    } catch (error) {
      setAlert({ message: 'No se pudo eliminar el usuario', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Eliminar Usuario</h2>
      {alert && <Alert {...alert} />}
      
      {usuario ? (
        <div className="card">
          <div className="card-body">
            <h4>¿Estás seguro de eliminar a este usuario?</h4>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>RUT:</strong> {usuario.rut}</p>
            <button onClick={handleDelete} className="btn btn-danger me-2">Sí, eliminar</button>
            <button onClick={() => navigate('/usuarios')} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </div>
  );
}

export default UsuarioDelete;