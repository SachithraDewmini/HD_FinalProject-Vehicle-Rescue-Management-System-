import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type DropdownMenuProps = {
  onHomePress: () => void;
  onLoginPress: () => void;
  onRegisterPress: () => void;
  onRidePress: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onHomePress,
  onLoginPress,
  onRegisterPress,
  onRidePress,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>Menu</Text>
      </TouchableOpacity>

      {/* Dropdown menu */}
      {dropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={onHomePress} style={styles.menuItem}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLoginPress} style={styles.menuItem}>
            <Text style={styles.menuText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRegisterPress} style={styles.menuItem}>
            <Text style={styles.menuText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRidePress} style={styles.menuItem}>
            <Text style={styles.menuText}>Ride Confirmation</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    padding: 10,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#FF8C00',
    borderRadius: 5,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: 150,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DropdownMenu;
