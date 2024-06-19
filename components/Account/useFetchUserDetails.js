import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints, authAPI } from '../../configs/API'; // Đảm bảo endpoints và authAPI đã được định nghĩa đúng trong API.js

const useFetchUserDetails = (userId, accessToken) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(endpoints.user_detail(userId), {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserDetails(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && accessToken) {
      fetchUserDetails();
    }
  }, [userId, accessToken]);

  return { userDetails, loading, error };
};

export default useFetchUserDetails;
