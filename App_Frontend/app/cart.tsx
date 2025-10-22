// src/screens/CartScreen.jsx
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Feather } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Imports
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import AppHeader from '../components/Common/AppHeader';
import FooterNav from '../components/Common/FooterNav';
import { COLORS } from '../constants/colors';
import { MOCK_CART_ITEMS } from '../constants/mockCartData';

const CartScreen = () => {
  const router = useRouter();
  // State for cart items (In MVP, this simulates global state)
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS); 

  // --- Core Cart Logic ---

  // 1. Calculate Subtotal (Uses useMemo for performance)
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);
  
  // 2. Function to update item quantity
  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 3. Function to remove item
  const handleRemove = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // 4. Checkout Handler (This triggers the Blockchain Simulation)
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart before proceeding.");
      return;
    }
    
    // --- MVP BLOCKCHAIN/PAYMENT SIMULATION ---
    // In your final presentation, this is where you showcase the automation.
    Alert.alert(
      "Proceed to KrishiPay (Blockchain)",
      `Confirm purchase of ${cartItems.length} items for Total: ₹${(subtotal * 1.05 + 150).toFixed(2).toLocaleString()}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm & Pay", 
          onPress: () => {
            // Simulate API call to backend/blockchain smart contract
            const transactionHash = `TXN${Date.now()}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
            Alert.alert(
              "Payment Successful! ✅", 
              `Your order has been secured on the blockchain.\nTransaction ID: ${transactionHash}`,
              // Clear cart and redirect to orders page (future screen)
              () => {
                setCartItems([]);
                router.push('/orders'); 
              }
            );
          }
        }
      ]
    );
  };
  
  // --- Render Functions ---
  const renderItem = ({ item }) => (
    <CartItem 
      item={item} 
      onUpdateQuantity={handleUpdateQuantity} 
      onRemove={handleRemove} 
    />
  );
  
  const hasItems = cartItems.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header hides the cart icon since we are on the cart screen */}
      <AppHeader title="Shopping Cart" showBackButton={true} showCartButton={false} />

      {hasItems ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Item List */}
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            scrollEnabled={false} // Disable FlatList scrolling inside ScrollView
            style={styles.list}
          />
          
          {/* Subtotal Callout */}
          <View style={styles.subtotalCallout}>
            <Text style={styles.subtotalText}>Subtotal ({cartItems.length} items):</Text>
            <Text style={styles.subtotalValue}>₹{subtotal.toLocaleString()}</Text>
          </View>
          
          {/* Checkout Button (Sticky to bottom on Amazon) */}
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>
              Proceed to KrishiPay ({cartItems.length} items)
            </Text>
          </TouchableOpacity>
          
          {/* Summary Panel */}
          <CartSummary subtotal={subtotal} />
          
          <View style={{height: 30}} />
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Feather name="shopping-cart" size={60} color={COLORS.placeholder} />
          <Text style={styles.emptyCartTitle}>Your Krishi-Unnati Cart is Empty</Text>
          <Text style={styles.emptyCartSubtitle}>
            Add some agri-goods or tools to get started!
          </Text>
          <TouchableOpacity 
            style={styles.shopNowButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.shopNowButtonText}>Start Shopping Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer Navigation Bar */}
      <FooterNav activeScreen="cart" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  list: {
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  
  // --- Checkout and Subtotal ---
  subtotalCallout: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  subtotalText: {
    fontSize: 16,
    color: COLORS.textDark,
    marginRight: 10,
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.danger, // Use a highlight color for the final price
  },
  checkoutButton: {
    backgroundColor: COLORS.accent, // Yellow/Gold for high-priority action
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  
  // --- Empty Cart ---
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 20,
  },
  emptyCartSubtitle: {
    fontSize: 14,
    color: COLORS.placeholder,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  shopNowButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textLight,
  }
});

export default CartScreen;