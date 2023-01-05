import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const employeeemail = [
    "mathieu.houde@codeboxx.biz",
    "patrick.thibault@codeboxx.biz",
    "francis.patry-jessop@codeboxx.biz",
    "david.amyot@codeboxx.biz",
    "marie-eve.goupil@codeboxx.biz",
    "francois.boivin@codeboxx.biz",
    "timothy.wever@codeboxx.biz",
    "kiril.kleinerman@codeboxx.biz",
    "felicia.hartono@codeboxx.biz",
    "eileen.ai@codeboxx.biz"
]

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const submitHandler = async () => {
    if (employeeemail.includes(email) && password === 'password123') {
      navigation.navigate('Home');
      alert('good');
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
