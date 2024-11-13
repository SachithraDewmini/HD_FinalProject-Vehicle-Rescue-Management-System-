import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './views/LoginForm';
import RegisterForm from './views/RegisterForm';
import HomeScreen from './views/HomeScreen';
import RideConfirmationScreen from './views/RideConfirmationScreen';

const App: React.FC = () => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isRideConfirmation, setIsRideConfirmation] = useState(false);

  const handleLoginPress = () => {
    setIsHomePage(true);
  };

  const handleRegisterPress = () => {
    setIsHomePage(true);
  };

  const handleRideConfirmationPress = () => {
    setIsRideConfirmation(true);
  };

  return (
    <View style={styles.container}>
      {isRideConfirmation ? (
        <RideConfirmationScreen />
      ) : isHomePage ? (
        <HomeScreen
          onGoPress={handleRideConfirmationPress}
          onNavigate={() => {}}
        />
      ) : (
        isLogin ? (
          <LoginForm
            onRegisterPress={() => setIsLogin(false)}
            onLoginPress={handleLoginPress}
          />
        ) : (
          <RegisterForm
            onLoginPress={() => setIsLogin(true)}
            onRegisterPress={handleRegisterPress}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
