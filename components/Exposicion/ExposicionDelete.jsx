import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExposiciones, deleteExposicion } from '../../services/ExposicionService';
import Alert from '../../components/shared/Alert';

function ExposicionDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exposicion, setExposicion] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargarExposicion();
  }, []);

  const cargarExposicion = async () => {
    try {
      const res = await getExposiciones();
      const exp = res.data.find(e => e.id === parseInt(id));
      if (exp) {
        setExposicion(exp);
      } else {
        setAlert({ message: 'Exposición no encontrada', type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'Error al cargar exposición', type: 'danger' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExposicion(id);
      setAlert({ message: 'Exposición eliminada correctamente', type: 'success' });
      setTimeout(() => navigate('/exposiciones'), 1500);
    } catch (error) {
      setAlert({ message: 'No se pudo eliminar la exposición', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Eliminar Exposición</h2>
      {alert && <Alert {...alert} />}
      
      {exposicion ? (
        <div className="card">
          <div className="card-body">
            <h4>¿Estás seguro de eliminar esta exposición?</h4>
            <p><strong>Título:</strong> {exposicion.titulo}</p>
            <p><strong>Fecha:</strong> {new Date(exposicion.fecha).toLocaleDateString()}</p>
            <p><strong>Lugar:</strong> {exposicion.lugar}</p>
            <button onClick={handleDelete} className="btn btn-danger me-2">Sí, eliminar</button>
            <button onClick={() => navigate('/exposiciones')} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando exposición...</p>
      )}
    </div>
  );
}

export default ExposicionDelete;