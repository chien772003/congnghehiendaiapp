import axios from 'axios';
import { authAPI, endpoints } from '../../configs/API';

const approveUser = async (userId, role, token) => {
  try {
    let response;
    if (role === 'teacher') {
      const response = await axios.patch(endpoints.approve_teacher(userId), authAPI(token));
    } else if (role === 'student') {
      const response = await axios.patch(endpoints.approve_student(userId), authAPI(token));
    }
    return response.status === 200;
  } catch (error) {
    console.error('Error approving user:', error);
    return false;
  }
};

export default approveUser;
