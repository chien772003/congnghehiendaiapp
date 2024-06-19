import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import API, { endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCourse = ({ onAddCourse }) => {
    const [courseName, setCourseName] = useState('');
    const [credits, setCredits] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [nextUrl, setNextUrl] = useState(null);

    // Load categories when component mounts
    useEffect(() => {
        const loadCategories = async () => {
            try {
                await fetchCategories(endpoints['categories']);
            } catch (ex) {
                console.error('Error loading categories:', ex);
                Alert.alert('Error', `Network Error: ${ex.message}`);
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);

    // Function to recursively fetch categories until all pages are loaded
    const fetchCategories = async (url) => {
        try {
            let res = await API.get(url);
            const newData = res.data.results;
            setCategories((prevCategories) => [...prevCategories, ...newData]);

            if (res.data.next) {
                setNextUrl(res.data.next);
                await fetchCategories(res.data.next);
            } else {
                setNextUrl(null);
                setLoadingCategories(false);
            }
        } catch (ex) {
            console.error('Error fetching categories:', ex);
            Alert.alert('Error', `Network Error: ${ex.message}`);
            setLoadingCategories(false);
        }
    };

    // Function to handle adding course
    const handleAddCourse = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const formData = new FormData();
            formData.append('name', courseName);
            formData.append('credits', credits);
            formData.append('category', categoryId);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const res = await API.post(endpoints['courses'], formData, config);

            onAddCourse(res.data); // Trigger parent component to update courses list
            Alert.alert('Success', 'Đã thêm khóa học thành công');
        } catch (ex) {
            console.error('Error adding course:', ex);
            Alert.alert('Error', `Failed to add course: ${ex.message}`);
        }
    };

    const selectCategory = (categoryId) => {
        setCategoryId(categoryId);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.categoryItem, categoryId === item.id && styles.selectedCategory]}
            onPress={() => selectCategory(item.id)}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm Khóa Học Mới</Text>

            {/* Category list */}
            {loadingCategories ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Số cột hiển thị
                    contentContainerStyle={styles.categoryList} // Style cho container của FlatList
                />
            )}

            {/* Input fields */}
            <TextInput
                style={styles.input}
                placeholder="Nhập tên khóa học"
                value={courseName}
                onChangeText={(text) => setCourseName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập số tín chỉ"
                value={credits}
                onChangeText={(text) => setCredits(text)}
                keyboardType="numeric"
            />

            {/* Add button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
                <Text style={styles.addButtonText}>Thêm Khóa Học</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryList: {
        flexDirection: 'row', // Xếp theo hàng ngang
        flexWrap: 'wrap', // Cho phép wrap khi không đủ không gian
        justifyContent: 'center', // Căn giữa các item
    },
    categoryItem: {
        width: '45%', // Độ rộng mỗi item (50% nếu numColumns=2)
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginHorizontal: '2.5%', // Khoảng cách ngang giữa các item
    },
    selectedCategory: {
        backgroundColor: 'lightblue',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddCourse;
