import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { styles } from '../styles/categoryStyles';

const SubCategoryCard = ({ item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.subCategoryCard}
      onPress={() => router.push({ pathname: '/productList', params: { categoryName: item.name } })}
    >
      <View style={styles.subCategoryCardImagePlaceholder}>
        <Feather name="box" size={30} color={COLORS.primary} />
      </View>
      <Text style={styles.subCategoryCardText} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SubCategoryCard;
