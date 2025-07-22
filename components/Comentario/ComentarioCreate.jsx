import React, { useState } from 'react';
import { createComentario } from '../../services/ComentarioService';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

function ComentarioCreate() {
  const [formData, setFormData] = useState({ contenido: '', usuario: '', exposicion: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.contenido || formData.contenido.length < 10) {
      newErrors.contenido = 'Mínimo 10 caracteres';
    }
    if (!formData.usuario) newErrors.usuario = 'Usuario requerido';
    if (!formData.exposicion) newErrors.exposicion = 'Exposición requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createComentario(formData);
      setAlert({ message: 'Comentario creado', type: 'success' });
      setTimeout(() => navigate('/comentarios'), 1500);
    } catch (error) {
      setAlert({ message: 'Error al crear', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Comentario</h2>
      {alert && <Alert {...alert} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Contenido</label>
          <textarea
            name="contenido"
            rows="4"
            className={`form-control ${errors.contenido ? 'is-invalid' : ''}`}
            value={formData.contenido}
            onChange={handleChange}
          ></textarea>
          {errors.contenido && <div className="invalid-feedback">{errors.contenido}</div>}
        </div>
        <div className="mb-3">
          <label>ID Usuario</label>
          <input
            type="number"
            name="usuario"
            className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
            value={formData.usuario}
            onChange={handleChange}
          />
          {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
        </div>
        <div className="mb-3">
          <label>ID Exposición</label>
          <input
            type="number"
            name="exposicion"
            className={`form-control ${errors.exposicion ? 'is-invalid' : ''}`}
            value={formData.exposicion}
            onChange={handleChange}
          />
          {errors.exposicion && <div className="invalid-feedback">{errors.exposicion}</div>}
        </div>
        <button type="submit" className="btn btn-success">Publicar</button>
      </form>
    </div>
  );
}

export default ComentarioCreate;