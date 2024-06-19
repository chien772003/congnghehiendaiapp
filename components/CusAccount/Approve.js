import axios from 'axios';
import { authAPI, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const approveUser = async (userId, role) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const api = authAPI(token);

    let response;
    if (role === 'teacher') {
      response = await api.patch(endpoints.approve_teacher(userId));
    } else if (role === 'student') {
      response = await api.patch(endpoints.approve_student(userId));
    }

    return response.status === 200;
  } catch (error) {
    console.error('Error approving user:', error);
    return false;
  }
};

export default approveUser;
