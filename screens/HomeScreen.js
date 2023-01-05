import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo"
const ElevatorStatusScreen = () => {
  const [elevatorData, setElevatorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(token);
      axios.get('https://localhost:7262/api/elevator', {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setElevatorData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    };

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
            onPress={() => navigation.navigate('ElevatorScreen', { elevatorId: item.id })}
            style={styles.elevatorItem}
          >
            <Text>Elevator ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    elevatorItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(25,23,253,1)',
    },
  });
export default ElevatorStatusScreen;
