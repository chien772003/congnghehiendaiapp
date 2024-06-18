import { useState, useEffect } from 'react';
import API, { authAPI, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        console.log('Token:', token); 
        const api = authAPI(token); 
        let allUsers = [];
        let nextUrl = endpoints['get_user']; 
        while (nextUrl) {
          const response = await api.get(nextUrl);
          if (response.data && response.data.results) {
            allUsers = [...allUsers, ...response.data.results];
            nextUrl = response.data.next; 
          } else {
            throw new Error('Dữ liệu trả về không có trong định dạng mong đợi');
          }
        }

        setUsers(allUsers);
      } catch (err) {
        console.error('Fetch error:', err); 
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      console.log('Token:', token); 

      const api = authAPI(token); 
      let allUsers = [];
      let nextUrl = endpoints['get_user']; 

      while (nextUrl) {
        const response = await api.get(nextUrl);
        if (response.data && response.data.results) {
          allUsers = [...allUsers, ...response.data.results];
          nextUrl = response.data.next; 
        } else {
          throw new Error('Dữ liệu trả về không có trong định dạng mong đợi');
        }
      }

      setUsers(allUsers);
    } catch (err) {
      console.error('Fetch error:', err); 
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, refetch };
};

export default useFetchUsers;
