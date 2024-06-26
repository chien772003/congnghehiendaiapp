import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MyStyles from '../../styles/MyStyles';
import MyContext from '../../configs/MyContext';
import API, { authAPI, endpoints } from '../../configs/API';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [user, dispatch] = useContext(MyContext);

  const login = async () => {
    if (!username || !password) {
      Alert.alert('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    try {
      let res = await API.post(endpoints['login'], {
        'username': username,
        'password': password,
        'client_id': "j871D7KPscbwHih7JSc1MNYDA7tCIYK3klQy80rw",
        'client_secret': "HSlFkNnczUoAyFoDnnlPF6HJ9BQu8gqwShjt27Iz1UGmukntAvdsmpPYZxlT3GzXBsptIJyMT0AurINlxUjg0LHkLnkY3V9nOIpypFPQmh5dbSrRBwh8qTNLZZDERjrA",
        'grant_type': "password"
      });
      
      const token = res.data.access_token;
      await AsyncStorage.setItem('token', token);
      console.info('Token:', token);

      let user = await authAPI(token).get(endpoints['current_user']);
      dispatch({
        "type": "login",
        "payload": user.data
      });

      navigation.navigate("App");
    } catch (ex) {
      console.error(ex);
      Alert.alert('Sai tên đăng nhập hoặc mật khẩu, vui lòng nhập lại');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subject}>Login</Text>
      <TextInput 
        value={username} 
        onChangeText={t => setUsername(t)} 
        placeholder='Tên đăng nhập...' 
        style={styles.input} 
      />
      <TextInput 
        value={password} 
        onChangeText={t => setPass(t)} 
        placeholder='Nhập mật khẩu...' 
        style={styles.input} 
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterGV')}>
        <Text style={styles.buttonText}>Đăng ký Giảng Viên</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterSV')}>
        <Text style={styles.buttonText}>Đăng ký Sinh Viên</Text>
      </TouchableOpacity>
    </View>
  )
};

export default Login;
