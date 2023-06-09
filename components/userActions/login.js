import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, CheckBox, StyleSheet, ToastAndroid } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { View, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    show: false
  });
  const url ="";
  const urlLocal ="https://localhost:44347/";
  const auth=getAuth();
  const handle2=async ()=>{
    console.log(auth.currentUser);
    await auth.signOut();
    console.log(auth.currentUser);
  }
  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
      });

    await axios.post(REACT_APP_WEB_API+'login/' + email + '/' + password, {}).then((res)=>console.log(res.data.token)).catch( (error) => {

      setMessage({
        text: error.response.data,
        show: true
      })
    })

  }

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={(value) => setRememberMe(value)}
          />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handle2}>
          <Text style={styles.buttonLabel}>test butonu</Text>
        </TouchableOpacity>
        <Snackbar open={message.show} autoHideDuration={3000}>
          <Alert severity="info" sx={{ width: "100%" }}>
            {message.text}
          </Alert>
        </Snackbar>
      </View>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginPage;
