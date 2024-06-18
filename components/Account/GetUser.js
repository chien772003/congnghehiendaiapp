import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, RefreshControl, TouchableOpacity } from 'react-native';
import useFetchUsers from './useFetchUsers';
import styles from './Styles';

const GetUser = () => {
  const { users, loading, error, refetch } = useFetchUsers();
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('all'); // State để lưu trạng thái nút lọc

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch(); // Chờ cho fetch dữ liệu xong
    } catch (error) {
      console.error("Lỗi khi refresh:", error);
    } finally {
      setRefreshing(false); 
    }
  };

  // Thêm log để kiểm tra dữ liệu người dùng
  console.log('Users:', users);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Lỗi: {error.message}</Text>;
  }

  const getRole = (user) => {
    if (user.is_teacher) return 'Giảng viên';
    if (user.is_student) return 'Sinh viên';
    return 'Người dùng';
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

  // Thêm log để kiểm tra dữ liệu người dùng sau khi lọc
  console.log('Filtered Users:', filteredUsers);

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'all' && styles.activeFilterButton]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterButtonText, filterType === 'all' && styles.activeFilterButtonText]}>
            Tất cả
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{`${item.first_name} ${item.last_name}`}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.role}>{`Vai trò: ${getRole(item)}`}</Text>
            </View>
            <Text style={styles.status}>{`Hoạt động: ${item.is_active ? 'Có' : 'Không'}`}</Text>
          </View>
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
    </View>
  );
};
export default GetUser;
