import React, { useState } from 'react';
import { createExposicion } from '../../services/ExposicionService';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

function ExposicionCreate() {
  const [formData, setFormData] = useState({ titulo: '', fecha: '', lugar: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const validateDate = (dateStr) => {
    const today = new Date();
    const inputDate = new Date(dateStr);
    return inputDate >= today;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.titulo.trim()) newErrors.titulo = 'Título requerido';
    if (!formData.fecha) newErrors.fecha = 'Fecha requerida';
    else if (!validateDate(formData.fecha)) newErrors.fecha = 'La fecha debe ser hoy o futura';
    if (!formData.lugar.trim()) newErrors.lugar = 'Lugar requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createExposicion(formData);
      setAlert({ message: 'Exposición creada', type: 'success' });
      setTimeout(() => navigate('/exposiciones'), 1500);
    } catch (error) {
      setAlert({ message: 'Error al crear', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Exposición</h2>
      {alert && <Alert {...alert} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
            value={formData.titulo}
            onChange={handleChange}
          />
          {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
        </div>

        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
            value={formData.fecha}
            onChange={handleChange}
          />
          {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
        </div>

        <div className="mb-3">
          <label>Lugar</label>
          <input
            type="text"
            name="lugar"
            className={`form-control ${errors.lugar ? 'is-invalid' : ''}`}
            value={formData.lugar}
            onChange={handleChange}
          />
          {errors.lugar && <div className="invalid-feedback">{errors.lugar}</div>}
        </div>

        <button type="submit" className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}

export default ExposicionCreate;