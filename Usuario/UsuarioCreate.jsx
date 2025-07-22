import React, { useState } from 'react';
import { createUsuario } from '../../services/UsuarioService';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/shared/Alert';

const validateRUT = (rut) => /^\d{7,8}-[kK0-9]$/.test(rut.toLowerCase());
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function UsuarioCreate() {
  const [formData, setFormData] = useState({ nombre: '', email: '', rut: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateRUT(formData.rut)) newErrors.rut = 'RUT inválido (ej: 12345678-9)';
    if (!validateEmail(formData.email)) newErrors.email = 'Correo inválido';
    if (formData.nombre.length < 3) newErrors.nombre = 'Nombre muy corto';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createUsuario(formData);
      setAlert({ message: 'Usuario creado', type: 'success' });
      setTimeout(() => navigate('/usuarios'), 1500);
    } catch (error) {
      setAlert({ message: 'Error al crear', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Usuario</h2>
      {alert && <Alert {...alert} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label>RUT</label>
          <input
            type="text"
            name="rut"
            placeholder="12345678-9"
            className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
            value={formData.rut}
            onChange={handleChange}
          />
          {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
        </div>
        <button type="submit" className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}

export default UsuarioCreate;