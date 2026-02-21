import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onSearchPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, onSearchPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.75}>
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, onBackPress ? styles.titleCentered : styles.titleLeft]}>{title}</Text>
      {onSearchPress && (
        <TouchableOpacity onPress={onSearchPress} style={styles.searchButton} activeOpacity={0.75}>
          <Feather name="search" size={22} color="#111827" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e9ef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
  },
  titleCentered: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  titleLeft: {
    flex: 1,
    textAlign: 'left',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  searchButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Header;