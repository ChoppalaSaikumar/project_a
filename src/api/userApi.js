import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/create-user';

export const createUser = async (userData) => {
  try {
    const response = await axios.post(apiUrl, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
