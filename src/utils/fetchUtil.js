import API_BASE_URL from '../api/apiConfig';

export const fetchUtil = (endpoint, options) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options)
    .then(response => response.json())
    .catch(error => {
      console.error('API call error:', error);
      throw error;
    });
};
