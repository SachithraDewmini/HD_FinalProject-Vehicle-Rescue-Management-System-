import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DropdownMenu from '../src/components/DropdownMenu';

interface LoginFormProps {
  onRegisterPress: () => void; // Prop for Register button navigation
  onLoginPress: () => void; // Prop for HomeScreen navigation after login
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegisterPress, onLoginPress }) => {
  // State for managing email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers for email and password changes
  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  // Function for handling login submit
  const handleLoginSubmit = () => {
    console.log('Logging in with', email, password);
    // Implement login validation/authentication here
    if (email && password) {
      onLoginPress(); // Trigger navigation to HomeScreen on successful login
    } else {
      console.log('Please fill in both fields');
    }
  };

  // Navigation handler functions
  const handleHomePress = () => {
    console.log('Redirecting to Home...');
    // Navigate to Home
  };

  const handleRidePress = () => {
    console.log('Redirecting to RideConfirmation...');
    // Navigate to RideConfirmation screen
  };

  return (
    <View style={styles.container}>
      {/* Dropdown menu for additional navigation options */}
      <DropdownMenu
        onHomePress={handleHomePress}
        onLoginPress={onLoginPress}
        onRegisterPress={onRegisterPress}
        onRidePress={handleRidePress}
      />

      {/* Title */}
      <Text style={styles.title}>Login Form</Text>

      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        autoCapitalize="none"
        textContentType="password"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Link to Register Form */}
      <TouchableOpacity onPress={onRegisterPress}>
        <Text style={styles.registerText}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for Login Screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoginForm;
