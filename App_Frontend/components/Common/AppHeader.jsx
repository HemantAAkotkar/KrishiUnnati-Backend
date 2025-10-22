// src/components/Common/AppHeader.jsx
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const AppHeader = ({ title, showBackButton = true, showCartButton = true }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.iconContainer}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
      ) : <View style={styles.iconContainer} />} {/* Placeholder for spacing */}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {showCartButton ? (
        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.iconContainer}>
          <Feather name="shopping-cart" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
      ) : <View style={styles.iconContainer} />} {/* Placeholder for spacing */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textLight,
    flex: 1, // Allow title to take up available space
    textAlign: 'center', // Center the title
  },
  iconContainer: {
    width: 30, // Give icons a fixed width for consistent spacing
    alignItems: 'center',
  }
});

export default AppHeader;