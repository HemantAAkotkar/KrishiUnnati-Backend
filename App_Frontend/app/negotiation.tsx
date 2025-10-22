import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { products } from './data/mockMarketplaceData';

export default function Negotiation() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    if (!quantity || !price) return Alert.alert('Please fill all fields');
    // You can later send this info to backend / Firebase
    router.push('/farmerCofirmation');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Negotiate with Farmer</Text>

      <View style={styles.fieldBox}>
        <Text style={styles.label}>Product</Text>
        <Text style={styles.value}>{product.name}</Text>
      </View>

      <View style={styles.fieldBox}>
        <Text style={styles.label}>Farmer Name</Text>
        <Text style={styles.value}>Ramesh Patil</Text>
      </View>

      <View style={styles.fieldBox}>
        <Text style={styles.label}>Farmer Rating</Text>
        <Text style={styles.value}>⭐ {product.rating}</Text>
      </View>

      <Text style={styles.label}>Required Quantity (kg)</Text>
      <TextInput
        placeholder="e.g. 50"
        keyboardType="numeric"
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Your Offer Price (₹ per kg)</Text>
      <TextInput
        placeholder="e.g. 110"
        keyboardType="numeric"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        placeholder="Any message for farmer..."
        style={[styles.input,{height:80}]}
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
        <Text style={styles.btnText}>Confirm & Send to Farmer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{padding:20,backgroundColor:'#fff'},
  title:{fontSize:22,fontWeight:'bold',marginBottom:20,color:'#2e7d32'},
  fieldBox:{marginBottom:10},
  label:{fontWeight:'600',color:'#333',marginBottom:4},
  value:{backgroundColor:'#f2f2f2',padding:10,borderRadius:6},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:6,padding:10,marginBottom:15},
  confirmBtn:{backgroundColor:'#4CAF50',padding:15,borderRadius:8,marginTop:10},
  btnText:{color:'#fff',textAlign:'center',fontWeight:'700'},
});
