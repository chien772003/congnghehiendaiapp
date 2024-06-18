import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      avatar: {
        borderRadius: 30,
      },
      filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },
      filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#007bff',
        margin: 5,
      },
      filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      activeFilterButton: {
        backgroundColor: '#0056b3',
      },
      activeFilterButtonText: {
        color: '#fff',
      },userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
      },
      avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
      },
      userInfo: {
        flex: 1,
      },
      userName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      email: {
        fontSize: 14,
        color: '#666',
      },
      role: {
        fontSize: 14,
        color: '#333',
      },
      status: {
        fontSize: 12,
        marginLeft: 'auto',
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#007BFF',
      },
      text: {
        fontSize: 18,
        marginBottom: 10,
      },
      filterButton: {
        backgroundColor: '#007bff',
      },
      activeFilterButton: {
        backgroundColor: '#0056b3',
      },                        
  });
  export default styles;