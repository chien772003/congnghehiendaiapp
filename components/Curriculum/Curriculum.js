import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import API, { endpoints } from '../../configs/API';

const Curriculum = () => {
    const [curriculumList, setCurriculumList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurriculum = async () => {
            try {
                const response = await API.get(endpoints['curriculum']); 

                setCurriculumList(response.data.results);
            } catch (error) {
                console.error('Error loading curriculum:', error);
                Alert.alert('Error', `Network Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCurriculum();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.subject}>Danh sách curriculum</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {curriculumList && curriculumList.length > 0 ? (
                        curriculumList.map((curriculum) => (
                            <View key={curriculum.id} style={styles.curriculumContainer}>
                                <Text style={styles.title}>{curriculum.title}</Text>
                                <Text style={styles.description}>{curriculum.description}</Text>
                                <Text style={styles.duration}>{`${curriculum.start_year} - ${curriculum.end_year}`}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noCurriculumText}>Không có curriculum nào</Text>
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
    curriculumContainer: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 10,
    },
    duration: {
        fontSize: 16,
        color: '#666',
    },
    noCurriculumText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Curriculum;
