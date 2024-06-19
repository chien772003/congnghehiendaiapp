import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import API, { endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCourse from './AddCourses'; // Import your AddCourse component here

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddCourse, setShowAddCourse] = useState(false);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                let res = await API.get(endpoints.courses);
                setCourses(res.data.results);
            } catch (ex) {
                console.error('Error loading courses:', ex);
                Alert.alert('Error', `Network Error: ${ex.message}`);
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const handleDeleteCourse = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await API.delete(`${endpoints.courses}${id}/`, config);

            const updatedCourses = courses.filter((course) => course.id !== id);
            setCourses(updatedCourses);
            Alert.alert('Success', 'Đã xóa khóa học thành công');
        } catch (ex) {
            console.error('Error deleting course:', ex);
            Alert.alert('Error', `Failed to delete course: ${ex.message}`);
        }
    };

    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
        setShowAddCourse(false);
    };

    const toggleAddCourseForm = () => {
        setShowAddCourse(!showAddCourse);
    };

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseContainer}>
            <Text style={styles.courseText}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => handleDeleteCourse(item.id)}
                style={styles.deleteButton}
            >
                <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.subject}>Danh sách khóa học</Text>

            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={toggleAddCourseForm}>
                    <Text style={styles.addButtonText}>{showAddCourse ? 'Đóng' : 'Thêm khóa học'}</Text>
                </TouchableOpacity>
            </View>

            {showAddCourse && <AddCourse onAddCourse={handleAddCourse} />}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={courses}
                    renderItem={renderCourseItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => <Text style={styles.noCoursesText}>Không có khóa học nào</Text>}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    subject: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButtonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    courseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    courseText: {
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    noCoursesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Courses;
