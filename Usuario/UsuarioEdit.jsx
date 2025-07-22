import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsuarios, updateUsuario } from '../../services/UsuarioService';
import Alert from '../../components/shared/Alert';

function UsuarioEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', email: '', rut: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await getUsuarios();
      const user = res.data.find(u => u.id === parseInt(id));
      if (user) setFormData(user);
    } catch (error) {
      setAlert({ message: 'Usuario no encontrado', type: 'danger' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario(id, formData);
      setAlert({ message: 'Usuario actualizado', type: 'success' });
      setTimeout(() => navigate('/usuarios'), 1500);
    } catch (error) {
      setAlert({ message: 'Error', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Usuario</h2>
      {alert && <Alert {...alert} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>RUT</label>
          <input type="text" name="rut" className="form-control" value={formData.rut} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success">Actualizar</button>
      </form>
    </div>
  );
}

export default UsuarioEdit;