import axios from 'axios';
import { authAPI, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deleteUser = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const api = authAPI(token);
    const response = await api.delete(endpoints.userDetail(userId));
    
    return response.status === 204; // Kiểm tra nếu thành công trả về status 204 (No Content)
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};

export default deleteUser;
