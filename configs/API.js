import axios from "axios";
const BASE_URL = 'http://192.168.1.6:8000/';

export const endpoints = {
  'categories': '/categories/',
  'courses': '/courses/',
  'login': '/o/token/',
  'registerGV': '/users/register-teacher/',
  'registerSV': '/users/register-student/',
  'current_user': '/users/current-user/',
  'get_user': '/users/',
  userDetail: (userId) => `/users/${userId}/`,
  'accept_student':'',
  'accept_teacher':''
};

export const authAPI = (accessToken) => axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

export default axios.create({
  baseURL: BASE_URL
});
