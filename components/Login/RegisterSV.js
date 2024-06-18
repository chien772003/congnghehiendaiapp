import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import API, { endpoints } from '../../configs/API';
import styles from './Styles';

const RegisterSV = ({ navigation }) => {
  const [user, setUser] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "birth_year": ""
  });

  const registerSV = async () => {
    if (!user.first_name || !user.last_name || !user.email) {
      Alert.alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    let form = new FormData();
    for (let key in user) {
      form.append(key, user[key]);
    }

    try {
      let res = await API.post(endpoints['registerSV'], form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.status === 201) {
        Alert.alert('Đăng ký thành công!');
        navigation.navigate('Login');
      } else {
        let errorText = await res.text();
        console.error('Đăng ký thất bại:', errorText);
        Alert.alert('Đăng ký thất bại:', errorText);
      }
    } catch (ex) {
      console.error('Đăng ký thất bại:', ex);
      Alert.alert('Đăng ký thất bại, vui lòng thử lại!');
    }
  };

  const change = (field, value) => {
    setUser(current => ({ ...current, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subject}>Đăng ký Tài Khoản Sinh Viên</Text>
      <TextInput
        placeholder='Họ...'
        style={styles.input}
        value={user.first_name}
        onChangeText={t => change("first_name", t)}
      />
      <TextInput
        placeholder='Tên...'
        style={styles.input}
        value={user.last_name}
        onChangeText={t => change("last_name", t)}
      />
      <TextInput
            placeholder='Năm sinh...'
            style={styles.input}
            value={user.birth_year}
            onChangeText={t => change("birth_year", t)}
            keyboardType='numeric'
          />
      <TextInput
        placeholder='Email...'
        style={styles.input}
        value={user.email}
        onChangeText={t => change("email", t)}
        keyboardType='email-address'
      />
      <TouchableOpacity style={styles.button} onPress={registerSV}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterSV;
