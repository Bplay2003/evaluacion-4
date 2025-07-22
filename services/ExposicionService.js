import api from './api';

export const getExposiciones = () => api.get('exposiciones/');
export const createExposicion = (data) => api.post('exposiciones/', data);
export const updateExposicion = (id, data) => api.put(`exposiciones/${id}/`, data);
export const deleteExposicion = (id) => api.delete(`exposiciones/${id}/`);