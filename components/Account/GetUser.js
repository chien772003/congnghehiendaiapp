import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Image } from 'react-native';
import useFetchUsers from './useFetchUsers';
import useFetchUserDetails from './useFetchUserDetails';
import styles from './Styles';

const GetUser = () => {
  const { users, loading, error, refetch } = useFetchUsers();
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const { userDetails, loading: userDetailsLoading, error: userDetailsError } = useFetchUserDetails(selectedUser?.id, 'your_access_token_here');

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
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={styles.userContainer}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{`${item.first_name} ${item.last_name}`}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.role}>{`Vai trò: ${getRole(item)}`}</Text>
              </View>
              <Text style={styles.status}>{`Hoạt động: ${item.is_active ? 'Có' : 'Không'}`}</Text>
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
