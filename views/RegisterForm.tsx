import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface RegisterFormProps {
  onLoginPress: () => void; // Prop for navigating to the Login screen
  onRegisterPress: () => void; // Prop for handling Register button press
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginPress, onRegisterPress }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validate and handle registration logic
  const handleRegister = () => {
    // Check for empty fields
    if (!username.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Check password length (example: length >= 6 characters)
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // If validation passes, proceed with registration
    console.log('Registering:', { username, email, password });

    // Reset input fields after registration
    setUsername('');
    setEmail('');
    setPassword('');

    // Trigger the onRegisterPress function passed as a prop
    onRegisterPress();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Fix and Go</Text>

      {/* Username input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        textContentType="password"
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Navigate to Login screen */}
      <TouchableOpacity onPress={onLoginPress}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
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
  logo: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
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
  switchText: {
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});

export default RegisterForm;
