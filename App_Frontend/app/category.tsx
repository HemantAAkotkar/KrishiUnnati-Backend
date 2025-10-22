import React, { useState } from 'react';
import { FlatList, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { MOCK_CATEGORIES } from '../constants/mockCategories';
import { styles } from '../styles/categoryStyles';

import FooterNav from '../components/FooterNav';
import Header from '../components/Header';
import MainCategoryTab from '../components/MainCategoryTab';
import SubCategoryCard from '../components/SubCategoryCard';

const CategoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(MOCK_CATEGORIES[0]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} /> */}
      <Header />
      
      <View style={styles.contentArea}>
        <View style={styles.mainCategoriesSidebar}>
          <FlatList
            data={MOCK_CATEGORIES}
            renderItem={({ item }) => (
              <MainCategoryTab item={item} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <ScrollView style={styles.subCategoriesContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.subContentTitle}>{selectedCategory.name}</Text>
          <View style={styles.subCategoryGrid}>
            {selectedCategory.subcategories.map((item, index) => (
              <SubCategoryCard key={index.toString()} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>

      <FooterNav />
    </SafeAreaView>
  );
};

export default CategoryScreen;
