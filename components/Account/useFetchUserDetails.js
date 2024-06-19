import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints, authAPI } from '../../configs/API';

const useFetchUserDetails = (userId, token) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !token) return;

    const fetchUserDetails = async () => {
      setLoading(true);
      setUserDetails(null); // Xóa dữ liệu cũ khi bắt đầu tải dữ liệu mới
      setError(null); // Xóa lỗi cũ khi bắt đầu tải dữ liệu mới
      try {
        const response = await axios.get(endpoints.user_detail(userId), authAPI(token));
        setUserDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  return { userDetails, loading, error };
};

export default useFetchUserDetails;
