import axios from 'axios';
import { authAPI, endpoints } from '../../configs/API';    

const deleteUser = async (userId, token) => {
  try {
    await axios.delete(endpoints.userDetail(userId), authAPI(token));
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
};

export default deleteUser;
