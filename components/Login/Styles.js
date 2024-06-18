import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subject: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  imagePicker: {
    height: 150,
    width: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imagePickerText: {
    textAlign: 'center',
    color: 'gray',
  },
  });
  export default styles;