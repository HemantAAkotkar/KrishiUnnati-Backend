// src/components/Cart/CartItem.jsx
import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {

  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    } else {
      // If user tries to decrease below 1, confirm removal
      onRemove(item.id);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}</Text>
        <Text style={styles.itemStock}>In Stock</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.itemTotal}>
          ₹{(item.price * item.quantity).toLocaleString()}
        </Text>
        
        {/* Quantity Controls */}
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.qtyButton}>
            <Feather name={item.quantity === 1 ? 'trash-2' : 'minus'} size={16} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.qtyButton}>
            <Feather name="plus" size={16} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        {/* Remove Button */}
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    alignItems: 'flex-start',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 4,
  },
  itemStock: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  
  actionsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80, // Match image height for alignment
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.placeholder,
    borderRadius: 5,
    marginTop: 5,
  },
  qtyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.background,
  },
  qtyText: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  removeButton: {
    marginTop: 5,
  },
  removeText: {
    color: COLORS.placeholder,
    fontSize: 12,
  }
});

export default CartItem;