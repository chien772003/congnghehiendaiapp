import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import API, { endpoints } from '../../configs/API';

const Categories = ({ onBack }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                let allCategories = [];
                let nextUrl = endpoints['categories'];

                while (nextUrl) {
                    let res = await API.get(nextUrl);
                    allCategories = [...allCategories, ...res.data.results];
                    nextUrl = res.data.next;
                }

                setCategories(allCategories);
            } catch (ex) {
                console.error('Error loading categories:', ex);
                Alert.alert('Error', `Network Error: ${ex.message}`);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        try {
            // Gửi request xóa category
            await API.delete(`${endpoints['categories']}${id}`);

            // Cập nhật lại danh sách categories sau khi xóa thành công
            const updatedCategories = categories.filter((category) => category.id !== id);
            setCategories(updatedCategories);
            Alert.alert('Success', 'Đã xóa category thành công');
        } catch (ex) {
            console.error('Error deleting category:', ex);
            Alert.alert('Error', `Failed to delete category: ${ex.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Quay lại</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Categories</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                            <View key={cat.id} style={styles.categoryContainer}>
                                <Text style={styles.categoryText}>{cat.name}</Text>
                                <TouchableOpacity
                                    onPress={() => handleDeleteCategory(cat.id)}
                                    style={styles.deleteButton}
                                >
                                    <Text style={styles.deleteButtonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text>Không có categories nào</Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    categoryText: {
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
});

export default Categories;
