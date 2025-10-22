import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { COLORS } from '../constants/colors';
import { useState } from 'react';
import { styles } from '../styles/categoryStyles';

const Header = () => {
  const router = useRouter();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setSearchVisible(true);
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={[styles.header, { alignItems: 'center' }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.textLight} />
      </TouchableOpacity>

      {/* Conditionally render title or search bar */}
      {!isSearchVisible ? (
        <>
          <Text style={styles.headerTitle}>Shop by Category</Text>

          {/* Search Icon */}
          <TouchableOpacity onPress={handleSearchToggle}>
            <Feather name="search" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </>
      ) : (
        // Search Bar
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearchClose} // hides search bar on submit
            autoFocus
          />
          <TouchableOpacity onPress={handleSearchClose}>
            <Ionicons name="close" size={22} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      )}

      {/* Cart Icon — only show if not searching */}
      {!isSearchVisible && (
        <TouchableOpacity onPress={() => router.push('/marketplace')}>
          <Feather name="shopping-cart" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
