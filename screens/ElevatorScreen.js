import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ElevatorScreen = () => {
  const [elevatorStatus, setElevatorStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7262/api/elevator/50');
        setElevatorStatus(response.data.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Elevator Status</h1>
      <p>{elevatorStatus}</p>
    </div>
  );
};

export default ElevatorScreen;
