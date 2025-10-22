import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FarmerConfirmation() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Sent to Farmer</Text>
      <Text style={styles.subtitle}>Waiting for farmer to accept the deal 🤝</Text>
      <TouchableOpacity onPress={() => router.push('/marketplace')} style={styles.btn}>
        <Text style={styles.btnText}>Back to Marketplace</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20,backgroundColor:'#fff'},
  title:{fontSize:22,fontWeight:'bold',color:'#2e7d32',marginBottom:10},
  subtitle:{fontSize:16,color:'#555',textAlign:'center',marginBottom:30},
  btn:{backgroundColor:'#4CAF50',padding:15,borderRadius:8,width:'80%'},
  btnText:{color:'#fff',textAlign:'center',fontWeight:'700'}
});
