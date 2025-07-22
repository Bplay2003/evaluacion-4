import React, { useEffect, useState } from 'react';
import { getExposiciones, deleteExposicion } from '../../services/ExposicionService';
import { Link } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

function ExposicionList() {
  const [exposiciones, setExposiciones] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getExposiciones();
      setExposiciones(res.data);
    } catch (error) {
      setAlert({ message: 'Error al cargar exposiciones', type: 'danger' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta exposición?')) return;
    try {
      await deleteExposicion(id);
      setAlert({ message: 'Exposición eliminada', type: 'success' });
      setTimeout(cargar, 500);
    } catch (error) {
      setAlert({ message: 'Error al eliminar', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Exposiciones</h2>
      {alert && <Alert {...alert} />}
      <Link to="/exposicion/create" className="btn btn-primary mb-3">Crear Exposición</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Lugar</th>
          </tr>
        </thead>
        <tbody>
          {exposiciones.map(exp => (
            <tr key={exp.id}>
              <td>{exp.titulo}</td>
              <td>{new Date(exp.fecha).toLocaleDateString()}</td>
              <td>{exp.lugar}</td>
              <td>
                <Link to={`/exposicion/edit/${exp.id}`} className="btn btn-sm btn-warning me-2">Editar</Link>
                <Link to={`/exposicion/delete/${exp.id}`} className="btn btn-sm btn-danger">Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExposicionList;