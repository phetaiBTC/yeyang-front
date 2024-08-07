import axios from 'axios';
import { API_BASE_URL } from './IP';


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user-login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // throw new Error(error.response.data.message || 'Login failed');
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Network error or unexpected issue');
    }
  }
};

export const getUser = async (page, perPage, search) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-users?page=${page}&perpage=${perPage}&search=${search}`);
    return response.data.info;
  } catch (error) {
    console.error('Error fetching users: ', error);
    throw error;
  }
};

export const Register = async (
  firstName,
  lastName,
  email,
  password,
  role,
  mobile) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user-register`, {
      firstName,
      lastName,
      email,
      password,
      role,
      mobile
    });
    return response.data.addUser;
  } catch (error) {
    if (error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Network error or unexpected issue');
    }
  }
}
