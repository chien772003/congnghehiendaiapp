import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://huyphu54.pythonanywhere.com//curriculum/';

const SearchCurriculum = () => {
    const [searchParams, setSearchParams] = useState({
        title: '',
        course_name: '',
        course_credits: '',
        user_username: '',
        start_year: '',
        end_year: ''
    });
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, { params: searchParams });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
            Alert.alert('Error', 'Failed to perform search. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập ký tự tìm kiếm ..."
                    value={searchParams.title}
                    onChangeText={(text) => setSearchParams({ ...searchParams, title: text })}
                />
                <Button title="Search" onPress={handleSearch} disabled={loading} />
            </View>

            {/* Hiển thị kết quả tìm kiếm */}
            <FlatList
                style={styles.resultList}
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        {/* Hiển thị các thông tin khác của item */}
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noResultsText}>Không có kết quả</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    resultList: {
        marginTop: 20,
    },
    resultItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noResultsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SearchCurriculum;
