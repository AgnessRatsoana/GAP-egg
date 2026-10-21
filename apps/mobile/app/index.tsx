
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// These images stay in the single root-level media folder.
const landingBackground = require('../../../media/landing-booking-page.png');
const gapMonthLogo = require('../../../media/trans-logo1.png');

export default function LandingScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={landingBackground}
      style={styles.background}
      resizeMode="cover"
    >
      <View pointerEvents="none" style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Image
            source={gapMonthLogo}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="Gap Month logo"
          />

          <View style={styles.intro}>
            <Text style={styles.title}>Gap Month</Text>

            <Text style={styles.slogan}>
              A safe place. A fresh start
            </Text>

            <Text style={styles.description}>
              Temporary accommodation, professional support, and
              personalised experiences when you need it most.
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/apply')}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Apply for a Gap Month →
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/auth')}
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>
                Already have an account?{' '}
                <Text style={styles.signInEmphasis}>Sign in</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#263D32',
  },
  overlay: {
     ...StyleSheet.absoluteFill,
  backgroundColor:'rgba(20, 35, 28, 0.42)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 16,
  },
  logo: {
    width: 200,
    height: 150,
  },
  intro: {
  width: '100%',
  alignItems: 'center',
  marginTop: -150,
  marginBottom: 24,
},
  title: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  slogan: {
  color: '#1B5E3B',
  fontSize: 19,
  fontWeight: '500',
  textAlign: 'center',
  marginTop: 12,
},
  description: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 340,
  },
  actions: {
    width: '100%',
    gap: 14,
    marginBottom: 12,
  },
  primaryButton: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#1B5E3B', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  signInButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  signInEmphasis: {
    color: '#1B5E3B',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.8,
  },
});
