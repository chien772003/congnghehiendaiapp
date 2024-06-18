import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import MyContext from '../../configs/MyContext';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';

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
          <Text style={styles.text}>Họ và tên: {user.first_name} {user.last_name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Năm sinh: {user.birth_year}</Text>
          <Text style={styles.text}>Học vị: {user.degree}</Text>
          <Button title="Đăng xuất" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};


export default Account;
    