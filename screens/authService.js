import axios from 'axios';
import { authAPI, endpoints } from '../configs/API';

export const getUserRole = async (token) => {
  try {
    const api = authAPI(token);
    const response = await api.get(endpoints.current_user);
    return response.data;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
};
