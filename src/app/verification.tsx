import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';

type VerificationProps = {
  setScreen?: (screen: 'signup') => void;
  email?: string;
  onVerify?: (otp: string) => void;
};

export default function VerificationScreen({
  setScreen,
  email = 'your email',
  onVerify,
}: VerificationProps) {
  const [otp, setOtp] = useState('');
  const otpRef = useRef<TextInput>(null);

  const handleVerify = () => {
    if (otp.length !== 6) return;

    if (onVerify) {
      onVerify(otp);
    } else {
      Alert.alert('Verified', 'Email verification completed successfully.');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >

        <View style={styles.otpContainer}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen?.('signup')}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.otpHeading}>Verify Your Email</Text>

          <View style={styles.illustration}>
            <Text style={styles.illustrationIcon}>✉️</Text>
          </View>

          <Text style={styles.description}>
            Please enter the 6-digit code sent to
          </Text>

          <Text style={styles.emailText}>{email}</Text>

          <Text style={styles.verificationLabel}>
            Verification code
          </Text>

          <TouchableOpacity
            style={styles.otpBoxes}
            activeOpacity={1}
            onPress={() => {
              const input = otpRef.current as unknown as { focus?: () => void } | null;
              input?.focus?.();
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View key={index} style={styles.otpBox}>
                <Text style={styles.otpDigit}>
                  {otp[index] || '–'}
                </Text>
              </View>
            ))}

            <TextInput
              ref={otpRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={(text) =>
                setOtp(text.replace(/[^0-9]/g, ''))
              }
              textContentType="oneTimeCode"
            />
          </TouchableOpacity>

          <View style={styles.resendRow}>
            <Text>Didn't receive the code? </Text>

            <TouchableOpacity
              onPress={() => {
                setOtp('');
                Alert.alert('OTP', 'Request a new code from your server.');
              }}
            >
              <Text style={styles.link}>Resend code</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              styles.verifyButton,
              otp.length !== 6 && styles.disabledButton
            ]}
            onPress={handleVerify}
            disabled={otp.length !== 6}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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

  verifyButton: {
    marginTop: 100,
  },

  disabledButton: {
    backgroundColor: '#D9DEDD',
  },

});