import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../src/theme';

export default function ComingSoonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ section?: string }>();
  const sectionName = typeof params.section === 'string' ? params.section : 'This section';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
        </Pressable>

        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons name="construct-outline" size={30} color={colors.primaryDark} />
          </View>
          <Text style={styles.sectionName}>{sectionName}</Text>
          <Text style={styles.title}>Under construction</Text>
          <Text style={styles.description}>This section is being prepared and will be available soon.</Text>
          <Pressable style={styles.homeButton} accessibilityRole="button" onPress={() => router.navigate('/')}>
            <Text style={styles.homeButtonText}>Back to home</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, paddingHorizontal: 20, backgroundColor: colors.background },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginTop: 8, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22, paddingBottom: 54 },
  iconWrap: { width: 70, height: 70, alignItems: 'center', justifyContent: 'center', marginBottom: 20, borderRadius: 22, backgroundColor: colors.sage },
  sectionName: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.secondaryGreen, marginBottom: 8 },
  title: { fontFamily: fonts.sansBold, fontSize: 23, color: colors.text, textAlign: 'center', marginBottom: 8 },
  description: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSecondary, textAlign: 'center', marginBottom: 22 },
  homeButton: { minHeight: 46, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 14, backgroundColor: colors.primaryDark },
  homeButtonText: { fontFamily: fonts.sansSemi, fontSize: 13, color: '#FFFFFF' },
});
