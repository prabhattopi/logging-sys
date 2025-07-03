import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

export const getLogs = async (filters) => {
  try {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '' && value !== null)
    );
    const response = await api.get('/logs', { params: cleanFilters });
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};
