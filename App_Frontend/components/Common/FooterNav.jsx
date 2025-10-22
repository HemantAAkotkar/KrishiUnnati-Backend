// src/components/Common/FooterNav.jsx
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const FooterNav = ({ activeScreen }) => {
  const router = useRouter();

  const getIconColor = (screenName) => 
    activeScreen === screenName ? COLORS.primary : COLORS.secondary;

  const getTextStyle = (screenName) => [
    styles.footerNavText,
    activeScreen === screenName && { color: COLORS.primary, fontWeight: 'bold' }
  ];

  return (
    <View style={styles.footerNav}>
      <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/')}>
        <Ionicons name="home-outline" size={24} color={getIconColor('home')} />
        <Text style={getTextStyle('home')}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/category')}>
        <Feather name="grid" size={24} color={getIconColor('categories')} />
        <Text style={getTextStyle('categories')}>Categories</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/account')}>
        <Feather name="user" size={24} color={getIconColor('account')} />
        <Text style={getTextStyle('account')}>Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerNavItem} onPress={() => router.push('/cart')}>
        <Feather name="shopping-cart" size={24} color={getIconColor('cart')} />
        <Text style={getTextStyle('cart')}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FooterNav;