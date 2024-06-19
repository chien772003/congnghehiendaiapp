import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import API, { endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCourse = ({ onAddCourse }) => {
    const [courseName, setCourseName] = useState('');
    const [credits, setCredits] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Load categories when component mounts
    useEffect(() => {
        const loadCategories = async () => {
            try {
                let res = await API.get(endpoints['categories']);
                setCategories(res.data.results);
            } catch (ex) {
                console.error('Error loading categories:', ex);
                Alert.alert('Error', `Network Error: ${ex.message}`);
            } finally {
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);

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

    // Function to select category by id
    const selectCategory = (categoryId) => {
        setCategoryId(categoryId);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm Khóa Học Mới</Text>

            {/* Category list */}
            {loadingCategories ? (
                <Text>Loading categories...</Text>
            ) : (
                categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[styles.categoryItem, categoryId === cat.id && styles.selectedCategory]}
                        onPress={() => selectCategory(cat.id)}
                    >
                        <Text>{cat.name}</Text>
                    </TouchableOpacity>
                ))
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
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryItem: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
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
