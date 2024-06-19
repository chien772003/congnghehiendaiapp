import axios from "axios";

const BASE_URL = 'https://huyphu54.pythonanywhere.com/';

export const endpoints = {
  'categories': '/categories/',
  'courses': '/courses/',
  'login': '/o/token/',
  'registerGV': '/users/register-teacher/',
  'registerSV': '/users/register-student/',
  'current_user': '/users/current-user/',
  'get_user': '/users/',
  'syllabuses':'/syllabuses/',
  'curriculum': '/curriculums/',
  userDetail: (userId) => `/users/${userId}/`,
  approve_teacher: (userId) => `/users/${userId}/approve-teacher/`,
  approve_student: (userId) => `/users/${userId}/approve-student/`,
};

export const authAPI = (accessToken) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export default axios.create({
  baseURL: BASE_URL
});
