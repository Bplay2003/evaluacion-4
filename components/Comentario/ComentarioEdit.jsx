import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComentarios, updateComentario } from '../../services/ComentarioService';
import Alert from '../../components/shared/Alert';

function ComentarioEdit() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contenido: '',
    usuario: '', 
    exposicion: ''
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarComentario();
  }, []);

  const cargarComentario = async () => {
    try {
      const res = await getComentarios();
      const comentario = res.data.find(c => c.id === parseInt(id));

      if (comentario) {
        setFormData({
          contenido: comentario.contenido || '',
          usuario: comentario.usuario || '',
          exposicion: comentario.exposicion || ''
        });
      } else {
        setAlert({ message: 'Comentario no encontrado', type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'Error al cargar el comentario', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const validate = () => {
    const newErrors = {};

    if (!formData.contenido.trim()) {
      newErrors.contenido = 'El contenido es obligatorio';
    } else if (formData.contenido.length < 10) {
      newErrors.contenido = 'El contenido debe tener al menos 10 caracteres';
    }

    if (!formData.usuario) {
      newErrors.usuario = 'Debe seleccionar un usuario';
    }

    if (!formData.exposicion) {
      newErrors.exposicion = 'Debe seleccionar una exposición';
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateComentario(id, formData);
      setAlert({ message: 'Comentario actualizado correctamente', type: 'success' });
      setTimeout(() => navigate('/comentarios'), 1500);
    } catch (error) {
      console.error('Error al actualizar:', error);
      setAlert({ 
        message: error.response?.data?.detail || 'No se pudo actualizar el comentario', 
        type: 'danger' 
      });
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Cargando comentario...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Editar Comentario</h2>
      {alert && <Alert {...alert} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">Contenido</label>
          <textarea
            id="contenido"
            name="contenido"
            className={`form-control ${errors.contenido ? 'is-invalid' : ''}`}
            rows="4"
            value={formData.contenido}
            onChange={handleChange}
            placeholder="Escribe tu comentario aquí..."
          ></textarea>
          {errors.contenido && <div className="invalid-feedback">{errors.contenido}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">ID del Usuario</label>
          <input
            type="number"
            id="usuario"
            name="usuario"
            className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
            value={formData.usuario}
            onChange={handleChange}
            min="1"
          />
          {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="exposicion" className="form-label">ID de la Exposición</label>
          <input
            type="number"
            id="exposicion"
            name="exposicion"
            className={`form-control ${errors.exposicion ? 'is-invalid' : ''}`}
            value={formData.exposicion}
            onChange={handleChange}
            min="1"
          />
          {errors.exposicion && <div className="invalid-feedback">{errors.exposicion}</div>}
        </div>

        <button type="submit" className="btn btn-success me-2">
          Actualizar Comentario
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/comentarios')}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default ComentarioEdit;