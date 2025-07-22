import React, { useEffect, useState } from 'react';
import { getUsuarios, deleteUsuario } from '../../services/UsuarioService';
import { Link } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getUsuarios();
      setUsuarios(res.data);
    } catch (error) {
      setAlert({ message: 'Error al cargar usuarios', type: 'danger' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar usuario?')) return;
    try {
      await deleteUsuario(id);
      setAlert({ message: 'Usuario eliminado', type: 'success' });
      setTimeout(cargar, 500);
    } catch (error) {
      setAlert({ message: 'Error', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>
      {alert && <Alert {...alert} />}
      <Link to="/usuario/create" className="btn btn-primary mb-3">Crear Usuario</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>RUT</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rut}</td>
              <td>
                <Link to={`/usuario/edit/${u.id}`} className="btn btn-sm btn-warning me-2">Editar</Link>
                <button onClick={() => handleDelete(u.id)} className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuarioList;