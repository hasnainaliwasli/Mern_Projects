import api from './api';
export const adminFetchUsers   = () => api.get('/api/admin/users');
export const adminUpdateUser   = (id, payload) => api.put(`/api/admin/users/${id}`, payload);
export const adminFetchPrompts = () => api.get('/api/admin/prompts');
