import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const ElevatorScreen = (props) => {
  const [elevatorStatus, setElevatorStatus] = useState('');
  const id = props.route.params.id;
  const [active, setActive] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7262/api/elevator/${id}`);
        setElevatorStatus(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async () => {
    try {
      const response = await axios.put(`https://localhost:7262/api/elevator/${id}/Active`);
      setActive(true);
      setElevatorStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Elevator Status</Text>
      <Text style={styles.statusid}>{id}</Text>
      <Text style={elevatorStatus === 'Active' ? styles.statusActive : styles.statusNonActive}>{elevatorStatus}</Text>
      {elevatorStatus !== 'Active' && !active && (
        <Button title="Set As Active" onPress={updateStatus} />
      )}
      {active && (
        <Button title="Return Home" onPress={() => navigation.navigate('Home')} />
      )}
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
  header: {
    fontSize: 44,
    color: 'rgba(0,90,255, 0.7)',
    marginBottom: 16,
  },
  statusActive: {
    fontSize: 36,
    color: 'green',
  },
  statusNonActive: {
    fontSize: 36,
    color: 'red',
  },
  statusid: {
    fontSize: 36,
    color: 'rgba(255, 38, 15, 0.8)',
  }
});

export default ElevatorScreen;
