import api from './api';
export const fetchPromptsByCategory = (categoryId) => api.get(`/api/prompts/${categoryId}`);
export const createPrompt = (payload) => api.post('/api/prompts', payload); // {title, fullPrompt, categoryId}
export const generatePrompt = (userPrompt) => api.post('/api/prompt/generate', { userPrompt });


