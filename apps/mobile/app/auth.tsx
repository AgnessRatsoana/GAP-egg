
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Reuses the existing root-level image. No duplicate asset folder.
const authBackground = require('../../../media/sign-up-in.png');

type AuthMode = 'signin' | 'signup';

export default function AuthScreen() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isSignUp = mode === 'signup';

  function handleSubmit() {
    const cleanEmail = email.trim().toLowerCase();

    if (isSignUp && !fullName.trim()) {
      Alert.alert('Full name required', 'Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Password too short',
        'Your password must contain at least 8 characters.',
      );
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      Alert.alert(
        'Passwords do not match',
        'Please make sure both password fields match.',
      );
      return;
    }

    Alert.alert(
      'Authentication not connected',
      'Your form passed basic validation. Sign-in and account creation must still be connected to the Gap Month backend.',
    );
  }

  function handleForgotPassword() {
    Alert.alert(
      'Password recovery',
      'Password recovery will be available after we connect the authentication service.',
    );
  }

  return (
    <ImageBackground
      source={authBackground}
      style={styles.background}
      resizeMode="cover"
    >
      <View pointerEvents="none" style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable
              onPress={() => router.replace('/')}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back to welcome</Text>
            </Pressable>

            <View style={styles.card}>
              <Text style={styles.eyebrow}>GAP MONTH</Text>

              <Text style={styles.title}>
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </Text>

              <Text style={styles.subtitle}>
                {isSignUp
                  ? 'Begin your journey towards a safe place and a fresh start.'
                  : 'Sign in to continue to your personal portal.'}
              </Text>

              <View style={styles.tabs}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setMode('signin')}
                  style={[
                    styles.tab,
                    !isSignUp && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      !isSignUp && styles.activeTabText,
                    ]}
                  >
                    Sign in
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => setMode('signup')}
                  style={[
                    styles.tab,
                    isSignUp && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isSignUp && styles.activeTabText,
                    ]}
                  >
                    Sign up
                  </Text>
                </Pressable>
              </View>

              {isSignUp && (
                <View style={styles.field}>
                  <Text style={styles.label}>Full name</Text>
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#85877E"
                    autoCapitalize="words"
                    autoComplete="name"
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>
              )}

              <View style={styles.field}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#85877E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  style={styles.input}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>

                <View style={styles.passwordContainer}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="At least 8 characters"
                    placeholderTextColor="#85877E"
                    secureTextEntry={!showPassword}
                    autoComplete={
                      isSignUp ? 'new-password' : 'current-password'
                    }
                    autoCapitalize="none"
                    style={styles.passwordInput}
                    returnKeyType={isSignUp ? 'next' : 'done'}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    onPress={() => setShowPassword((previous) => !previous)}
                    style={styles.showButton}
                  >
                    <Text style={styles.showText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>

                {isSignUp && (
                  <Text style={styles.helperText}>
                    Use at least 8 characters and choose a unique password.
                  </Text>
                )}
              </View>

              {isSignUp && (
                <View style={styles.field}>
                  <Text style={styles.label}>Confirm password</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Enter your password again"
                    placeholderTextColor="#85877E"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    style={styles.input}
                    returnKeyType="done"
                  />
                </View>
              )}

              {!isSignUp && (
                <Pressable
                  onPress={handleForgotPassword}
                  style={styles.forgotButton}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              )}

              <Pressable
                accessibilityRole="button"
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.submitButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.submitText}>
                  {isSignUp ? 'Create account →' : 'Sign in →'}
                </Text>
              </Pressable>

              <Text style={styles.switchText}>
                {isSignUp
                  ? 'Already have an account? '
                  : "Don't have an account? "}

                <Text
                  onPress={() =>
                    setMode((previous) =>
                      previous === 'signin' ? 'signup' : 'signin',
                    )
                  }
                  style={styles.switchLink}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </Text>
              </Text>

              <Text style={styles.privacyNote}>
                Your journey deserves dignity, care, and privacy.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EAE6DB',
  },
  overlay: {
     ...StyleSheet.absoluteFill,
  backgroundColor: 'rgba(239, 235, 225, 0.22)',
  },
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  backText: {
    color: '#344A3A',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 253, 248, 0.96)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(91, 106, 83, 0.18)',
  },
  eyebrow: {
    color: '#8C7354',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 12,
  },
  title: {
    color: '#283D30',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    color: '#62665E',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#EFEEE7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 22,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 9,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1DED3',
  },
  tabText: {
    color: '#74766F',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#304736',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: '#344438',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#D9D9CE',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    color: '#26372C',
    fontSize: 14,
  },
  passwordContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9CE',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    paddingLeft: 14,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    minHeight: 48,
    color: '#26372C',
    fontSize: 14,
  },
  showButton: {
    padding: 6,
  },
  showText: {
    color: '#536C55',
    fontWeight: '700',
    fontSize: 12,
  },
  helperText: {
    color: '#77796F',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 7,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    marginTop: -8,
    marginBottom: 16,
  },
  forgotText: {
    color: '#536C55',
    fontSize: 12,
    fontWeight: '600',
  },
  submitButton: {
    minHeight: 54,
    backgroundColor: '#344A3A',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  switchText: {
    textAlign: 'center',
    color: '#65685F',
    fontSize: 13,
    marginTop: 22,
  },
  switchLink: {
    color: '#344A3A',
    fontWeight: '700',
  },
  privacyNote: {
    color: '#88897F',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 22,
  },
  pressed: {
    opacity: 0.82,
  },
});
