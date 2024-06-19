import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetchUsers from './useFetchUsers';
import useFetchUserDetails from './useFetchUserDetails';
import deleteUser from '../CusAccount/Delete';
import approveUser from '../CusAccount/Approve';
import styles from './Styles';

const GetUser = () => {
  const [token, setToken] = useState(null);
  const { users, loading, error, refetch } = useFetchUsers();
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    fetchToken();
  }, []);

  const { userDetails, loading: userDetailsLoading, error: userDetailsError } = useFetchUserDetails(selectedUser?.id, token);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (userId) => {
    if (token && await deleteUser(userId, token)) {
      await refetch();
    }
  };

  const handleApprove = async (userId, role) => {
    if (token && await approveUser(userId, role, token)) {
      await refetch();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Lỗi: {error.message}</Text>;
  }

  const getRole = (user) => {
    if (user.is_teacher) return 'teacher';
    if (user.is_student) return 'student';
    return 'user';
  };

  const filterUsers = () => {
    switch (filterType) {
      case 'teacher':
        return users.filter(user => user.is_teacher && user.is_active);
      case 'student':
        return users.filter(user => user.is_student && user.is_active);
      case 'requests':
        return users.filter(user => !user.is_active);
      default:
        return users;
    }
  };

  const filteredUsers = filterUsers();

  const handleUserPress = (user) => {
    setSelectedUser(user);
  };

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    return (
      <View style={styles.userDetailsContainer}>
        <View style={styles.userDetailsHeader}>
          <Text style={styles.userDetailsHeaderText}>Chi tiết người dùng</Text>
          <TouchableOpacity onPress={() => setSelectedUser(null)}>
            <Text style={styles.closeIcon}>X</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: selectedUser.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{`${selectedUser.first_name} ${selectedUser.last_name}`}</Text>
        <Text style={styles.email}>{selectedUser.email}</Text>
        <Text style={styles.role}>{`Vai trò: ${getRole(selectedUser)}`}</Text>
        <View style={styles.userDetailsContent}>
          <Text style={styles.userDetailsText}>
            <Text style={styles.userDetailsLabel}>Hoạt động:</Text> {selectedUser.is_active ? 'Có' : 'Không'}
          </Text>
          {/* Add more details as needed */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter buttons section */}
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'teacher' && styles.activeFilterButton]}
          onPress={() => setFilterType('teacher')}
        >
          <Text style={[styles.filterButtonText, filterType === 'teacher' && styles.activeFilterButtonText]}>
            Tài khoản Giảng viên
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'student' && styles.activeFilterButton]}
          onPress={() => setFilterType('student')}
        >
          <Text style={[styles.filterButtonText, filterType === 'student' && styles.activeFilterButtonText]}>
            Tài khoản Sinh viên
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'requests' && styles.activeFilterButton]}
          onPress={() => setFilterType('requests')}
        >
          <Text style={[styles.filterButtonText, filterType === 'requests' && styles.activeFilterButtonText]}>
            Danh sách yêu cầu đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={styles.userContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{`${item.first_name} ${item.last_name}`}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.role}>{`Vai trò: ${getRole(item)}`}</Text>
              </View>
              <Text style={styles.status}>{`Hoạt động: ${item.is_active ? 'Có' : 'Không'}`}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </TouchableOpacity>
              {!item.is_active && (
                <TouchableOpacity onPress={() => handleApprove(item.id, getRole(item))} style={styles.approveButton}>
                  <Text style={styles.approveButtonText}>Xác nhận</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#0000ff']}
            tintColor={'#0000ff'}
          />
        }
      />

      {renderUserDetails()}
    </View>
  );
};

export default GetUser;
