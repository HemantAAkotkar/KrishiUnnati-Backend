import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from '../../components/Common/AppHeader'; // Assuming you have AppHeader
import { COLORS } from '../../constants/colors'; // Import your COLORS constant
import { products } from "../data/mockMarketplaceData"; // Assuming this path


export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((item) => item.id === id);

  // --- Placeholder Functions for Button Actions ---
  const handleAddToCart = () => {
    if (!product) return; // Should not happen if product is found
    Alert.alert("Added to Cart", `${product.name} has been added to your cart!`);
    // In a real app:
    // 1. Add product to a global cart state (e.g., Redux, Context, Zustand)
    // 2. Show a toast notification or update cart icon badge
  };

  const handleBuyNow = () => {
    if (!product) return;
    Alert.alert(
      "Buy Now", 
      `Proceed to purchase ${product.name} for ₹${product.price} / quintal?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Buy", 
          onPress: () => {
            console.log("Proceeding to checkout with:", product.name);
            // In a real app:
            // 1. Add product to a temporary "buy now" cart
            // 2. Navigate directly to a checkout/payment screen
            router.push('/checkout'); 
          }
        }
      ]
    );
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: COLORS.danger, fontSize: 16 }}>❌ Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <AppHeader title="Product Details" showBackButton={true} showCartButton={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ✅ Local image fix: Assuming product.image can be a require() for local assets */}
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styles.image} 
        />

        <View style={styles.detailsCard}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>Category: Crops</Text>
          <Text style={styles.location}>📍 {product.location}</Text>
          <Text style={styles.price}>₹{product.price} / quintal</Text>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
        </View>

        {/* --- Action Buttons --- */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Feather name="shopping-cart" size={20} color={COLORS.textDark} style={styles.buttonIcon} />
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        
        {/* Placeholder for Product Description / More Info */}
        <View style={styles.descriptionCard}>
            <Text style={styles.descriptionHeader}>Product Description</Text>
            <Text style={styles.descriptionText}>
                High-quality organic tomatoes, freshly harvested from local farms. 
                Perfect for all your culinary needs. Grown with sustainable practices and
                no artificial pesticides. Available for immediate delivery.
            </Text>
        </View>

        <View style={{height: 20}} /> {/* Spacer at the bottom */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // Use background color
  },
  scrollContent: { 
    padding: 16, 
    // Removed backgroundColor from here, set on fullScreenContainer
  },
  image: { 
    width: "100%", 
    height: 240, 
    borderRadius: 10, 
    marginBottom: 16,
    // Add a subtle shadow for a modern look
    elevation: 5,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  name: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: COLORS.textDark,
    marginBottom: 5,
  },
  category: { 
    fontSize: 16, 
    color: COLORS.secondary, 
    marginVertical: 4,
    fontWeight: '500',
  },
  location: { 
    fontSize: 14,
    color: COLORS.placeholder, 
    marginVertical: 2 
  },
  price: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: COLORS.primary, 
    marginVertical: 8 
  },
  rating: { 
    marginVertical: 8,
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  
  // --- New Styles for Buttons ---
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10, // Slight horizontal margin
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row', // Align icon and text
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card, // Lighter background for add to cart
    borderColor: COLORS.primary,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10, // Space between buttons
    elevation: 2,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 8, // Space between icon and text
  },
  buttonIcon: {
      // styles for icons within buttons
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: COLORS.accent, // Energetic yellow for buy now
    paddingVertical: 14, // Slightly more padding to stand out
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buyNowButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark, // Dark text on yellow for contrast
  },

  // --- Description Card ---
  descriptionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 0, // No horizontal margin if outside the scrollContent padding
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
  },

  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});