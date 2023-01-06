import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [employeeEmails, setEmployeeEmails] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7262/api/employee`);
        setEmployeeEmails(response.data.map(employee => employee.email));
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const submitHandler = () => {
    if (employeeEmails.includes(email) && password === 'password123') {
      navigation.navigate('Home');
    } else {
      alert('Incorrect Email Or Password');
    }
  };
  return (
<View style={styles.container} behavior='padding'>
  <Image
    style={styles.image}
    source={require('../assets/R2.png')}
  />
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={text => setEmail(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Password"
      value={password}
      onChangeText={text => setPassword(text)}
      style={styles.input}
      secureTextEntry
    />
  </View>
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      onPress={submitHandler}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  </View>
</View>
  );
};


const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        image: {
          width: '68%',
          height: '11%',
        },
        inputContainer: {
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        input: {
          backgroundColor: 'rgba(255, 38, 15, 0.8)',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
          borderColor: 'red',
          borderWidth: 2,
          width: '100%',
        },
        buttonContainer: {
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 20,
        },
        button: {
          backgroundColor: 'rgba(0,90,255, 0.7)',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
          alignItems: 'center',
          width: '100%',
          borderColor: 'blue',
          borderWidth: 2,
        },
        buttonText: {
          color: 'white',
        },

  });
  
export default LoginScreen;
