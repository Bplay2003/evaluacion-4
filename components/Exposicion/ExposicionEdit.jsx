import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExposiciones, updateExposicion } from '../../services/ExposicionService';
import Alert from '../../components/shared/Alert';

function ExposicionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ titulo: '', fecha: '', lugar: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getExposiciones();
      const exp = res.data.find(e => e.id === parseInt(id));
      if (exp) setFormData(exp);
    } catch (error) {
      setAlert({ message: 'No se encontró la exposición', type: 'danger' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExposicion(id, formData);
      setAlert({ message: 'Actualizado correctamente', type: 'success' });
      setTimeout(() => navigate('/exposiciones'), 1500);
    } catch (error) {
      setAlert({ message: 'Error al actualizar', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Exposición</h2>
      {alert && <Alert {...alert} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título</label>
          <input type="text" name="titulo" className="form-control" value={formData.titulo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input type="date" name="fecha" className="form-control" value={formData.fecha} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Lugar</label>
          <input type="text" name="lugar" className="form-control" value={formData.lugar} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">Actualizar</button>
      </form>
    </div>
  );
}

export default ExposicionEdit;