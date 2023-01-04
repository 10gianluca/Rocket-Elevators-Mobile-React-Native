import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigation();
    const submitHandler = (e) => {
        e.preventDefault();

    console.log(
      `https://java-api.codeboxxtest.xyz/authenticate?email=${email}&password=${password}`
    );
    var token = "";
    axios
      .post(`https://java-api.codeboxxtest.xyz/authenticate?email=${email}&password=${password}`)
      .then((result) => {
        console.log(
          `https://java-api.codeboxxtest.xyz/authenticate?email=${email}&password=${password}`
        );
        const token = String(result.data["access_token"]);
        console.log("result: " + token);
        localStorage.setItem("token", token);
        // navigate('/home')
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid Login");
      });
    console.log(token);
  };

  return (
    <View
        style={styles.container}
        behavior="padding"
    >
      <Image
            style={styles.image}
            source={require('../assets/R2.png')}
        />
      <View style={styles.inputContainer}>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text) }
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text) }
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
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center', 
        top:'-5%',
        width: '68%',
        height: '11%',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'rgba(255, 38, 15, 0.8)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'red',
        borderWidth: 2,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
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
    buttonText:{
        color: 'white'
    }
})