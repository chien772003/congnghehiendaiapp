import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MyStyles from '../../styles/MyStyles';
import API, { endpoints } from '../../configs/API';
import styles from './Styles';

const RegisterGV = ({ navigation }) => {
  const [user, setUser] = useState({
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "birth_year": "",
    "avatar": "",
    "degree": "",
    "password": "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageSelected, setImageSelected] = useState(false);

  const registerGV = async () => {
    if (user.password !== confirmPassword) {
      Alert.alert('Xác nhận mật khẩu không khớp');
      return;
    }

    let form = new FormData();
    for (let key in user) {
      if (key === "avatar" && user[key]) {
        form.append(key, {
          uri: user[key],
          name: 'avatar.jpg',
          type: 'image/jpeg',
        });
      } else {
        form.append(key, user[key]);
      }
    }

    try {
      let res = await API.post(endpoints['registerGV'], form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.status === 201) {
        Alert.alert('Đăng ký thành công!');
        navigation.navigate('Login');
      }
    } catch (ex) {
      console.error(ex);
      Alert.alert('Đăng ký thất bại, vui lòng thử lại!');
    }
  };

  const change = (field, value) => {
    setUser(current => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Xin lỗi, chúng tôi cần quyền truy cập thư viện ảnh để sử dụng chức năng này!');
      }
    };

    getPermission();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        change("avatar", result.assets[0].uri);
        setImageSelected(true);
        console.log("avt uri: ", result.assets[0].uri);
      } else {
        console.log("Image picking cancelled");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.subject}>Đăng ký Tài Khoản Giảng Viên</Text>
          <TextInput
            placeholder='Tên đăng nhập...'
            style={styles.input}
            value={user.username}
            onChangeText={t => change("username", t)}
          />
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
          <TextInput
            placeholder='Học vị...'
            style={styles.input}
            value={user.degree}
            onChangeText={t => change("degree", t)}
          />
          <View style={MyStyles.margin}>
            <Text>Chọn ảnh đại diện:</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={{ width: '100%', height: '100%' }} />
              ) : (
                <Text style={styles.imagePickerText}>{imageSelected ? '' : 'Chọn ảnh đại diện'}</Text>
              )}
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Nhập mật khẩu...'
            style={styles.input}
            value={user.password}
            onChangeText={t => change("password", t)}
            secureTextEntry
          />
          <TextInput
            placeholder='Xác nhận mật khẩu...'
            style={styles.input}
            value={confirmPassword}
            onChangeText={t => setConfirmPassword(t)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={registerGV}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterGV;
