import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { categories, products } from './data/mockMarketplaceData';

// --- ENERGETIC COLOR PALETTE ---
const COLORS = {
  primary: '#4CAF50', // Vibrant Green (Energy/Growth)
  secondary: '#00796B', // Deep Teal/Emerald for contrast
  background: '#F9F9F9', // Clean light background
  card: '#FFFFFF',
  accent: '#FFC107', // Energetic Yellow/Gold for stars/highlights
  textDark: '#212121',
  textLight: '#FFFFFF',
  placeholder: '#9E9E9E',
  danger: '#F44336',
};

// --- CONSTANTS FOR 3 CARDS PER ROW ---
const CARD_MARGIN = 8;
const NUM_COLUMNS = 3;
const { width } = Dimensions.get('window');
// Calculate card width: (Total Width - (Margin * (Columns + 1))) / Columns
const CARD_WIDTH = (width - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS; 


const Marketplace = () => {
  // 1. Correctly initialize the router hook inside the component
  const router = useRouter(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  /**
   * 2. Fixed Logout functionality:
   * Uses router.replace() to navigate to '/login', which clears the navigation stack, 
   * preventing the user from navigating back to the marketplace.
   */
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // You would clear user session/token state here
          router.replace("/login"); 
         }, 
      },
    ]);
  };

  /**
   * 1. Uses router.push() for product detail navigation.
   */
  const renderProductCard = ({ item }) => (
  <Link href={`/productDetail/${item.id}`} asChild>
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardLocation} numberOfLines={1}>{item.location}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome5 name="star" solid color={COLORS.accent} size={10} />
          <Text style={styles.cardRating}>{item.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.cardPrice}>₹{item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);


  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryChip}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  // Ensure this path is correct for your project structure
  const logoImage = require('../assets/images/Logo.png'); 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Custom Header */}
      <View style={styles.header}>
        {/* Logo + Title */}
        <View style={styles.titleContainer}>
          <Image source={logoImage} style={styles.logo} />
          <Text style={styles.title}>Krishi Unnati</Text>
        </View>

        {/* Profile Button (Placeholder for Profile) */}
        <TouchableOpacity 
          style={styles.headerIcon} 
          onPress={() => router.push('/profile')}
        >
          <Feather name="user" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* Cart Button */}
        {/* <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => router.push('/cart')}
        >
          <Feather name="shopping-cart" size={24} color={COLORS.textLight} />
        </TouchableOpacity> */}
      </View>
      
      {/* Search Bar (Moved below the header for better visibility) */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={COLORS.placeholder} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for crops, fertilizers, tools..."
            placeholderTextColor={COLORS.placeholder}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Product Listings */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          numColumns={NUM_COLUMNS} // 3. Set to 3 cards per row
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No products found for "{searchQuery}"</Text>
        </View>
      )}
      
      {/* Footer Navigation Bar (for the required togglable screens) */}
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/')}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={[styles.footerNavText, { color: COLORS.primary }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/category')}>
          <Feather name="grid" size={24} color={COLORS.secondary} />
          <Text style={styles.footerNavText}>Categories</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/cart')}>
          <Feather name="shopping-cart" size={24} color={COLORS.secondary} />
          <Text style={styles.footerNavText}>Cart</Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity style={styles.footerNavItem} onPress={handleLogout}>
          <Feather name="log-out" size={24} color={COLORS.danger} />
          <Text style={[styles.footerNavText, { color: COLORS.danger }]}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // --- HEADER & NAVIGATION ---
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Takes up remaining space
  },
  logo: {
    width: 42,
    height: 42,
    marginRight: 8,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '800', // Made title bolder
    color: COLORS.textLight,
  },
  headerIcon: {
    marginLeft: 20,
  },
  
  // --- SEARCH BAR STYLES ---
  searchBarContainer: {
    paddingHorizontal: CARD_MARGIN,
    paddingVertical: 10,
    backgroundColor: COLORS.primary, // Keep search background consistent with header
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.textLight,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: COLORS.textDark,
  },

  // --- CATEGORIES ---
  categoriesContainer: {
    paddingVertical: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.placeholder + '30',
  },
  categoryChip: {
    backgroundColor: COLORS.secondary + '10', // Light secondary color
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary + '30',
  },
  categoryText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: 12,
  },
  
  // --- PRODUCT CARDS (3 Columns) ---
  listContainer: {
    padding: CARD_MARGIN / 2, // Less padding to utilize space
  },
  card: {
    width: CARD_WIDTH, // Dynamic width for 3 columns
    margin: CARD_MARGIN / 2, // Half margin for spacing
    backgroundColor: COLORS.card,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH * 0.9, // Nearly square image
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 6,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: COLORS.textDark,
  },
  cardLocation: {
    fontSize: 10,
    color: COLORS.placeholder,
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardRating: {
    marginLeft: 3,
    fontSize: 11,
    color: COLORS.textDark,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  
  // --- FOOTER NAVIGATION ---
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.placeholder + '30',
  },
  footerNavItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerNavText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  
  // --- NO RESULTS ---
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.placeholder,
  },
});

export default Marketplace;