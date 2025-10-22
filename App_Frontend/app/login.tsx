
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';

import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Reverting to network images to prevent local path errors
const backgroundImage =require("../assets/images/icon.png");
const logoImage = require("../assets/images/icon.png");


const AuthScreen = () => {
  const router = useRouter();

  // State to toggle between Login and Sign Up modes
  const [isLoginMode, setIsLoginMode] = useState(true);
  // State to toggle between Email and OTP login methods
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  // State to track if OTP has been "sent" in the OTP login flow
  const [otpSent, setOtpSent] = useState(false);

  // State for all input fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [otp, setOtp] = useState('');

  // useEffect hook to handle the back button press
  useEffect(() => {
    // const router = useRouter();
    const backAction = () => {
      if (!isLoginMode) {
        setIsLoginMode(true);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isLoginMode]);

  // Universal handler for the main action button
  const handleAuthentication = () => {
    // const router = useRouter();
  if (isLoginMode) {
    if (loginWithOtp) {
      if (!mobileNumber || !otp) {
        Alert.alert('Login Error', 'Please enter your mobile number and the OTP.');
        return;
      }
      console.log('Attempting OTP login with:', { mobileNumber, otp });
      // ✅ Auto navigate to Marketplace after OTP login
      Alert.alert('Login Successful', 'Welcome!');
      router.replace('/marketplace');


    } else {
      // --- EMAIL LOGIN LOGIC ---
      if (!email || !password) {
        Alert.alert('Login Error', 'Please enter both email and password.');
        return;
      }

      const defaultEmail = 'farmer@test.com';
      const defaultPassword = 'password123';

      if (email.toLowerCase() === defaultEmail && password === defaultPassword) {
        // ✅ Direct navigation without waiting for Alert
        Alert.alert('Login Successful', 'Welcome!');
        router.replace('./marketplace');
      } else {
        Alert.alert('Login Error', 'Invalid credentials. Please try again.');
      }
    }
  } else {
    // --- SIGN UP LOGIC ---
    if (!fullName || !mobileNumber || !email || !password || !confirmPassword) {
      Alert.alert('Sign Up Error', 'Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Sign Up Error', 'Passwords do not match.');
      return;
    }

    console.log('Attempting to sign up with:', { fullName, mobileNumber, email });

    // ✅ After signup → go back to login screen
    Alert.alert('Success!', 'Your account has been created. Please log in.');
    setIsLoginMode(true);
  }
};

  
  // Mock function for sending OTP
  const handleSendOtp = () => {
    if(!mobileNumber) {
      Alert.alert('Error', 'Please enter a mobile number.');
      return;
    }
    console.log('Sending OTP to:', mobileNumber);
    setOtpSent(true);
    Alert.alert('OTP Sent', `An OTP has been sent to ${mobileNumber}.`);
  };

  const renderLoginForm = () => (
    <>
      <Text style={styles.formTitle}>Welcome Back</Text>
      {loginWithOtp ? (
        <>
          <TextInput style={styles.input} placeholder="Enter 10-digit mobile number" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" maxLength={10} />
          {otpSent && <TextInput style={styles.input} placeholder="Enter OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" />}
          <TouchableOpacity style={styles.authButton} onPress={otpSent ? handleAuthentication : handleSendOtp}>
            <Text style={styles.authButtonText}>{otpSent ? 'Verify & Sign In' : 'Send OTP'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Email Address (farmer@test.com)" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Password (password123)" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.authButton} onPress={handleAuthentication}>
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => { setLoginWithOtp(!loginWithOtp); setOtpSent(false); }}>
        <Text style={styles.subToggleText}>
          {loginWithOtp ? 'Login with Email instead' : 'Login with OTP instead'}
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderSignUpForm = () => (
    <>
      <Text style={styles.formTitle}>Create Account</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Full Name *" value={fullName} onChangeText={setFullName} />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Mobile Number *" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" maxLength={10} />
      </View>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Email Address *" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Role *" value={role} onChangeText={setRole} />
      </View>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Password *" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Confirm Password *" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      </View>
      <TextInput style={styles.input} placeholder="Aadhaar Number" value={aadhaar} onChangeText={setAadhaar} keyboardType="number-pad" maxLength={12} />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.thirdInput]} placeholder="State *" value={state} onChangeText={setState} />
        <TextInput style={[styles.input, styles.thirdInput]} placeholder="District *" value={district} onChangeText={setDistrict} />
        <TextInput style={[styles.input, styles.thirdInput]} placeholder="Village" value={village} onChangeText={setVillage} />
      </View>
      <TouchableOpacity style={styles.authButton} onPress={handleAuthentication}>
        <Text style={styles.authButtonText}>Create Account</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <StatusBar barStyle="light-content" />
        <View style={styles.overlay}>
          <View style={styles.titleContainer}>
            <Image source={logoImage} style={styles.logo} />
            <Text style={styles.title}>Krishi Unnati</Text>
          </View>
          <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {isLoginMode ? renderLoginForm() : renderSignUpForm()}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={() => setIsLoginMode(prevState => !prevState)}>
                  <Text style={[styles.toggleText, styles.toggleLink]}>
                    {isLoginMode ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 68, 32, 0.75)',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    maxHeight: '65%',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  thirdInput: {
    width: '31%',
  },
  authButton: {
    backgroundColor: '#22C55E',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  toggleText: {
    color: '#666',
    fontSize: 14,
  },
  toggleLink: {
    color: '#22C55E',
    fontWeight: 'bold',
  },
  subToggleText: {
    color: '#22C55E',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600'
  },
});

export default AuthScreen;
