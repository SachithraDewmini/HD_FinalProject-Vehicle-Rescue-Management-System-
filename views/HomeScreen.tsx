import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface HomeScreenProps {
  onGoPress: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGoPress }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/logo.png' }} // Replace with your logo URI
          style={styles.logo}
        />
        <Text style={styles.headerText}>FIX & GO</Text>
      </View>

      <Text style={styles.welcomeText}>Welcome to FIX & GO !!</Text>

      {/* Service Cards Section */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => console.log('Mechanic selected')}>
          <Image
            source={{ uri: 'https://example.com/mechanic-icon.png' }} // Replace with Mechanic icon URI
            style={styles.icon}
          />
          <Text style={styles.cardText}>Mechanic</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => console.log('Towing Service selected')}>
          <Image
            source={{ uri: 'https://example.com/towing-icon.png' }} // Replace with Towing Service icon URI
            style={styles.icon}
          />
          <Text style={styles.cardText}>Towing Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => console.log('Rent Vehicles selected')}>
          <Image
            source={{ uri: 'https://example.com/rent-icon.png' }} // Replace with Rent Vehicles icon URI
            style={styles.icon}
          />
          <Text style={styles.cardText}>Rent Vehicles</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation and Menu */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('Home icon pressed')}>
          <Text style={styles.footerIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Notifications icon pressed')}>
          <Text style={styles.footerIcon}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.footerIcon}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Logout icon pressed')}>
          <Text style={styles.footerIcon}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Profile selected')}>
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Settings selected')}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Help selected')}>
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF2E9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  footerIcon: {
    fontSize: 24,
    color: '#333',
  },
  menu: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;
