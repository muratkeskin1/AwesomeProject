import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url ="";
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState({
    show: false,
    message: ""
  });
  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await axios.post(
        REACT_APP_WEB_API+"user",
        formData
      );
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          showModal(setIsSuccessModalVisible,"kayıt başarılı");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          showModal(setIsSuccessModalVisible,errorCode+" "+errorMessage);
        
        });
    } catch (error) {
      showModal(setIsSuccessModalVisible,error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Modal
        visible={isSuccessModalVisible.show}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSuccessModalVisible({show:false})}
      >
        <View style={styles.successModal}>
          <Text style={styles.successText}>{isSuccessModalVisible.message}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    padding: 10,
    marginVertical: 5,
    width: "80%",
    maxWidth: 400,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  successModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#00a86b',
  },
});

export default RegisterScreen;
function showModal(setIsSuccessModalVisible,message) {
  setIsSuccessModalVisible({ show: true, message: message });
  setTimeout(() => {
    setIsSuccessModalVisible({ show: false });
  }, 2000);
}
