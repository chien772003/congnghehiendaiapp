import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import MyContext from '../../configs/MyContext';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const [user, dispatch] = useContext(MyContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch({ type: 'logout' });
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          {user.avatar && (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          )}
          <Text style={styles.title}>Thông tin tài khoản</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Họ và tên:</Text>
              <Text style={styles.value}>{user.first_name} {user.last_name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Năm sinh:</Text>
              <Text style={styles.value}>{user.birth_year}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Học vị:</Text>
              <Text style={styles.value}>{user.degree}</Text>
            </View>
          </View>
          <Button title="Đăng xuất" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
});

export default Account;
