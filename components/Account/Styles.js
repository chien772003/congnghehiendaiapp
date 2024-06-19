import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    margin: 3,
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 60, 
    height: 60,
    borderRadius: 30, // Đổi thành hình tròn
    marginRight: 15, // Tăng khoảng cách với thông tin người dùng
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15, // Tăng kích thước tên người dùng
    fontWeight: 'bold',
    marginBottom: 2, // Điều chỉnh khoảng cách giữa các thông tin
  },
  email: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  role: {
    fontSize: 10,
    color: '#999',
  },
  userDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDetailsHeaderText: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetailsContent: {
    marginTop: 15, 
  },
  userDetailsText: {
    fontSize: 16,
    marginBottom: 8, 
  },
  userDetailsLabel: {
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#999',
  },
  status: {
    fontSize: 14,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 100,
    marginRight:10
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  approveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 100,
  },
  approveButtonText: {
    color: 'white',
    textAlign: 'center',
  },                      
  });
  export default styles;