import axios from 'axios';

// Get all users available
const getAll = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, login };
