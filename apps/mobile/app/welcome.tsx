import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../src/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../../media/landing-booking-page.png')} 
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient
        pointerEvents="none"
        colors={[
          'rgba(16, 43, 29, 0.14)',
          'rgba(16, 43, 29, 0.18)',
          'rgba(16, 43, 29, 0.23)',
          'rgba(16, 43, 29, 0.28)',
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.backgroundWash}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image
              source={require('../../../media/trans-logo1.png')}
              style={styles.logoImage}
              contentFit="contain"
              accessibilityLabel="Gap Month logo"
            />
            <Text style={styles.brand}>Gap Month</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headline}>
              A safe place. A fresh start.
            </Text>
            <Text style={styles.description}>
              Temporary accommodation, professional support, and personalised experiences when you need it most.
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.applyButton, pressed && styles.buttonPressed]}
              accessibilityRole="button"
              onPress={() => router.replace('/')}
            >
              <Text style={styles.applyButtonText}>Apply for a Gap Month</Text>
              <Text style={styles.applyArrow}>→</Text>
            </Pressable>

            <Pressable
              style={styles.signInButton}
              accessibilityRole="button"
              onPress={() => router.push('/auth')}
            >
              <Text style={styles.signInPrompt}>Already have an account? </Text>
              <Text style={styles.signInLink}>Sign in</Text>
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
    backgroundColor: colors.background,
  },
  backgroundImage: {
    opacity: 0.92,
  },
  backgroundWash: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 14,
  },
  hero: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 22,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 180,
  },
  brand: {
    fontFamily: fonts.sansBold,
    fontSize: 40,
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 2 },
  },
  headline: {
    width: '100%',
    fontFamily: fonts.sansSemi,
    fontSize: 17,
    lineHeight: 23,
    color: colors.primaryDark,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.28)',
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  description: {
    maxWidth: 340,
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.38)',
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 1 },
  },
  actions: {
    width: '100%',
    paddingBottom: 10,
  },
  applyButton: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: colors.primaryDark,
  },
  buttonPressed: {
    opacity: 0.88,
  },
  applyButtonText: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    color: '#FFFFFF',
  },
  applyArrow: {
    fontFamily: fonts.sansSemi,
    fontSize: 19,
    color: '#FFFFFF',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  signInPrompt: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  signInLink: {
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.primaryDark,
    textDecorationLine: 'underline',
  },
});
