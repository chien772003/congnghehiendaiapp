import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import API, { endpoints } from '../../configs/API';

const Syllabus = () => {
    const [syllabusList, setSyllabusList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSyllabus = async () => {
            try {
                const response = await API.get(endpoints['syllabuses']);
                setSyllabusList(response.data.results);s
            } catch (error) {
                console.error('Error loading syllabus:', error);
                Alert.alert('Error', `Network Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabus();
    }, []);

    const handleDeleteSyllabus = async (id) => {
        try {
            await API.delete(`${endpoints.syllabus}/${id}`);

            // Xóa syllabus từ danh sách sau khi xóa thành công
            const updatedSyllabusList = syllabusList.filter((syllabus) => syllabus.id !== id);
            setSyllabusList(updatedSyllabusList);
            Alert.alert('Success', 'Đã xóa syllabus thành công');
        } catch (error) {
            console.error('Error deleting syllabus:', error);
            Alert.alert('Error', `Failed to delete syllabus: ${error.message}`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.subject}>Danh sách syllabus</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {syllabusList && syllabusList.length > 0 ? (
                        syllabusList.map((syllabus) => (
                            <View key={syllabus.id} style={styles.syllabusContainer}>
                                <Text style={styles.syllabusText}>{syllabus.name}</Text>
                                <TouchableOpacity
                                    onPress={() => handleDeleteSyllabus(syllabus.id)}
                                    style={styles.deleteButton}
                                >
                                    <Text style={styles.deleteButtonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noSyllabusText}>Không có syllabus nào</Text>
                    )}
                </>
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
    syllabusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    syllabusText: {
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
    noSyllabusText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Syllabus;
