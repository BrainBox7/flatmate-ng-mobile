import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  signupContent: {
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 45,
    color: '#263B39',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#858B8B',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
  },
  matchText: {
    color: '#398A78',
    marginTop: -15,
    marginBottom: 15,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#176F65',
    borderColor: '#176F65',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  termsText: {
    fontSize: 15,
  },
  primaryButton: {
    height: 60,
    backgroundColor: '#176F65',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 25,
    color: '#777',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 35,
  },
  social: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#176F65',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    color: '#176F65',
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
  },
  backButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#F3F7F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 35,
    color: '#176F65',
    marginTop: -5,
  },
  otpHeading: {
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center',
    color: '#263B39',
    marginTop: -45,
  },
  illustration: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  illustrationIcon: {
    fontSize: 90,
  },
  description: {
    fontSize: 17,
    color: '#858B8B',
    textAlign: 'center',
    marginTop: 35,
  },
  emailText: {
    fontSize: 17,
    color: '#222',
    textAlign: 'center',
    marginTop: 8,
  },
  verificationLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#263B39',
    textAlign: 'center',
    marginTop: 65,
    marginBottom: 25,
  },
  otpBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  otpBox: {
    width: '15%',
    height: 60,
    borderWidth: 1,
    borderColor: '#858B8B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontSize: 23,
    fontWeight: '500',
    color: '#263B39',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },
  resendText: {
    color: '#176F65',
  },
  verifyButton: {
    marginTop: 100,
  },
  disabledButton: {
    backgroundColor: '#D9DEDD',
  },
});

export default function App() {
  const [screen, setScreen] = useState('signup');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [accepted, setAccepted] = useState(false);
  const [otp, setOtp] = useState('');

  const otpRef = useRef(null);

  const handleSignup = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!accepted) {
      Alert.alert('Error', 'Please accept the Terms and Conditions.');
      return;
    }

    setScreen('otp');
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter your 6-digit verification code.');
      return;
    }

    Alert.alert('Success', 'Phone number verified successfully.');
  };

  if (screen === 'signup') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.signupContent}>

            <Text style={styles.heading}>Sign Up</Text>

            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {confirmPassword.length > 0 && (
              <Text style={styles.matchText}>
                {password === confirmPassword
                  ? '✓ Password match!'
                  : 'Passwords do not match'}
              </Text>
            )}

            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAccepted(!accepted)}
            >
              <View style={[
                styles.checkbox,
                accepted && styles.checked
              ]}>
                {accepted && <Text style={styles.checkMark}>✓</Text>}
              </View>

              <Text style={styles.termsText}>
                Accept Terms and Conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignup}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or continue with</Text>

            <View style={styles.socialRow}>
              <Text style={styles.social}>G</Text>
              <Text style={styles.social}>●</Text>
              <Text style={styles.social}>f</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.link}>Sign In</Text>
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.otpContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setScreen('signup')}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.otpHeading}>OTP Verification</Text>

        <View style={styles.illustration}>
          <Text style={styles.illustrationIcon}>✉️</Text>
        </View>

        <Text style={styles.description}>We sent a verification code to</Text>
        <Text style={styles.emailText}>{phone}</Text>
        <Text style={styles.verificationLabel}>Enter verification code</Text>

        <TouchableOpacity
          style={styles.otpBoxes}
          activeOpacity={1}
          onPress={() => otpRef.current?.focus()}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.otpBox}>
              <Text style={styles.otpDigit}>{otp[index] || ''}</Text>
            </View>
          ))}
          <TextInput
            ref={otpRef}
            style={styles.hiddenInput}
            value={otp}
            onChangeText={(value) => setOtp(value.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text>Didn't receive the code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            styles.verifyButton,
            otp.length !== 6 && styles.disabledButton,
          ]}
          onPress={handleVerify}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}