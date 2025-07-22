import api from './api';

export const getComentarios = () => api.get('comentarios/');
export const createComentario = (data) => api.post('comentarios/', data);
export const updateComentario = (id, data) => api.put(`comentarios/${id}/`, data);
export const deleteComentario = (id) => api.delete(`comentarios/${id}/`);