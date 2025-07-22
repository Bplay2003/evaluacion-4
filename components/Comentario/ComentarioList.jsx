import React, { useEffect, useState } from 'react';
import { getComentarios, deleteComentario } from '../../services/ComentarioService';
import { Link } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

function ComentarioList() {
  const [comentarios, setComentarios] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getComentarios();
      setComentarios(res.data);
    } catch (error) {
      setAlert({ message: 'Error al cargar comentarios', type: 'danger' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar comentario?')) return;
    try {
      await deleteComentario(id);
      setAlert({ message: 'Comentario eliminado', type: 'success' });
      setTimeout(cargar, 500);
    } catch (error) {
      setAlert({ message: 'Error', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Comentarios</h2>
      {alert && <Alert {...alert} />}
      <Link to="/comentario/create" className="btn btn-primary mb-3">Crear Comentario</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Contenido</th>
            <th>Usuario</th>
            <th>Exposición</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map(c => (
            <tr key={c.id}>
              <td>{c.contenido.substring(0, 50)}...</td>
              <td>{c.usuario_nombre || 'Anónimo'}</td>
              <td>{c.exposicion_titulo || 'Sin exposición'}</td>
              <td>
                <Link to={`/comentario/edit/${c.id}`} className="btn btn-sm btn-warning me-2">Editar</Link>
                <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComentarioList;