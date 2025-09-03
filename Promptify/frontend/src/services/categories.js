import api from './api';
export const fetchCategories = () => api.get('/api/categories');
export const createCategory = (name) => api.post('/api/categories', { name });
