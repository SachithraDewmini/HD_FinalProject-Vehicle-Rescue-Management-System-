import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropdownMenu from '../src/components/DropdownMenu';



const RideConfirmationScreen: React.FC = () => {
  const handleHomePress = () => {
    console.log('Redirecting to Home...');
    // Handle Home redirection (e.g., navigate to Home screen)
  };

  const handleLoginPress = () => {
    console.log('Redirecting to Login...');
    // Handle Login redirection (e.g., navigate to Login screen)
  };

  const handleRegisterPress = () => {
    console.log('Redirecting to Register...');
    // Handle Register redirection (e.g., navigate to Register screen)
  };

  const handleRidePress = () => {
    console.log('Redirecting to RideConfirmation...');
    // Handle Ride Confirmation redirection (e.g., navigate to RideConfirmation screen)
  };

  const handleConfirmRide = () => {
    console.log('Ride confirmed!');
    // Implement logic for confirming the ride (e.g., API call or navigation)
  };

  return (
    <View style={styles.container}>
      <DropdownMenu
        onHomePress={handleHomePress}
        onLoginPress={handleLoginPress}
        onRegisterPress={handleRegisterPress}
        onRidePress={handleRidePress}
      />
      <Text style={styles.title}>Ride Confirmation</Text>
      <Text style={styles.subtitle}>Please confirm your ride details below:</Text>

      {/* Add any additional ride details here */}
      <View style={styles.rideDetailsContainer}>
        <Text style={styles.rideDetail}>Pick-up Location: XYZ Street</Text>
        <Text style={styles.rideDetail}>Destination: ABC Location</Text>
        <Text style={styles.rideDetail}>Estimated Time: 20 minutes</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirmRide}>
        <Text style={styles.buttonText}>Confirm Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHomePress}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  rideDetailsContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rideDetail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: '#FF8C00',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
  },
});

export default RideConfirmationScreen;
