// src/components/Cart/CartSummary.jsx
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SHIPPING_FEE, TAX_RATE } from '../../constants/mockCartData';

const CartSummary = ({ subtotal }) => {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_FEE + tax;

  const DetailRow = ({ label, value, isTotal = false }) => (
    <View style={[styles.detailRow, isTotal && styles.totalRow]}>
      <Text style={[styles.detailLabel, isTotal && styles.totalLabel]}>{label}</Text>
      <Text style={[styles.detailValue, isTotal && styles.totalValue]}>₹{value.toFixed(2).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      <DetailRow label="Items Subtotal" value={subtotal} />
      <DetailRow label={`Krishi GST (${TAX_RATE * 100}%)`} value={tax} />
      <DetailRow label="Shipping Fee" value={SHIPPING_FEE} />
      
      <View style={styles.divider} />
      
      <DetailRow label="Order Total" value={total} isTotal={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 10,
  },
  totalRow: {
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  }
});

export default CartSummary;