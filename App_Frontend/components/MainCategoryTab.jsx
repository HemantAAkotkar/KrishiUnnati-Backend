import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { styles } from '../styles/categoryStyles';

const MainCategoryTab = ({ item, selectedCategory, setSelectedCategory }) => {
  const isSelected = item.id === selectedCategory.id;
  return (
    <TouchableOpacity
      style={[styles.mainCategoryTab, isSelected && styles.mainCategoryTabSelected]}
      onPress={() => setSelectedCategory(item)}
    >
      <Feather name={item.icon} size={20} color={isSelected ? COLORS.primary : COLORS.placeholder} />
      <Text style={[styles.mainCategoryText, isSelected && styles.mainCategoryTextSelected]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default MainCategoryTab;
