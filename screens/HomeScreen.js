import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo"

const HomeScreen = () => {
  const [elevatorData, setElevatorData] = useState([]);
  const navigation = useNavigation();  

  const fetchData = async () => {
    axios.get('https://localhost:7262/api/elevator', {
      headers: {
          "Access-Control-Allow-Origin": "*"
      }
    })
    .then(function (response) {
      setElevatorData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inactiveElevators = elevatorData.filter(elevator => elevator.status === "Inactive");

  return (
    <View style={styles.container}>
      <FlatList
        data={inactiveElevators}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ElevatorScreen', { id: item.id })} 
            style={styles.elevatorItem}
          >
            <Text style={styles.Text}>Elevator ID: {item.id}</Text>
            <Text style={styles.Text}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Log Out" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elevatorItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,90,255, 0.7))',
  },
  Text:{
    color: 'rgba(255, 38, 15, 0.8)',
  }
});
export default HomeScreen;
