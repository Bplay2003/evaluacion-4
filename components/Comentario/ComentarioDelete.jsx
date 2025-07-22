import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComentarios, deleteComentario } from '../../services/ComentarioService';
import Alert from '../../components/shared/Alert';

function ComentarioDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    cargarComentario();
  }, []);

  const cargarComentario = async () => {
    try {
      const res = await getComentarios();
      const com = res.data.find(c => c.id === parseInt(id));
      if (com) {
        setComentario(com);
      } else {
        setAlert({ message: 'Comentario no encontrado', type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'Error al cargar comentario', type: 'danger' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComentario(id);
      setAlert({ message: 'Comentario eliminado correctamente', type: 'success' });
      setTimeout(() => navigate('/comentarios'), 1500);
    } catch (error) {
      setAlert({ message: 'No se pudo eliminar el comentario', type: 'danger' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Eliminar Comentario</h2>
      {alert && <Alert {...alert} />}
      
      {comentario ? (
        <div className="card">
          <div className="card-body">
            <h4>¿Estás seguro de eliminar este comentario?</h4>
            <p><strong>Contenido:</strong> "{comentario.contenido.substring(0, 100)}..."</p>
            <p><strong>Usuario:</strong> {comentario.usuario_nombre || 'Anónimo'}</p>
            <p><strong>Exposición:</strong> {comentario.exposicion_titulo || 'Sin título'}</p>
            <button onClick={handleDelete} className="btn btn-danger me-2">Sí, eliminar</button>
            <button onClick={() => navigate('/comentarios')} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando comentario...</p>
      )}
    </div>
  );
}

export default ComentarioDelete;