import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supportProfessionals } from '../../src/data/supportProfessionals';
import { colors, fonts } from '../../src/theme';

export default function ProfessionalProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const professional = supportProfessionals.find((item) => item.id === id) ?? supportProfessionals[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
          <Text style={styles.headerTitle}>Professional profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileHero}>
            <Image source={professional.photo} style={styles.avatar} contentFit="cover" accessibilityLabel={professional.name} />
            <View style={styles.availableTag}>
              <View style={styles.availableDot} />
              <Text style={styles.availableText}>Available</Text>
            </View>
            <Text style={styles.name}>{professional.name}</Text>
            <Text style={styles.specialty}>{professional.specialty}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#D7A844" />
              <Text style={styles.rating}>{professional.rating.toFixed(2)}</Text>
              <Text style={styles.sessions}>· {professional.completedSessions} completed sessions</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{professional.bio}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Service details</Text>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={19} color={colors.secondaryGreen} />
              <Text style={styles.detailText}>{professional.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="shield-checkmark-outline" size={19} color={colors.secondaryGreen} />
              <Text style={styles.detailText}>Verified Gap Month provider</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={styles.requestButton}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/request-service', params: { professionalId: professional.id } })}
          >
            <Text style={styles.requestButtonText}>Request service</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  headerTitle: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.text },
  headerSpacer: { width: 42 },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 24 },
  profileHero: { alignItems: 'center', paddingTop: 16, paddingBottom: 28 },
  avatar: { width: 118, height: 118, borderRadius: 59, backgroundColor: colors.sage, marginBottom: 14 },
  availableTag: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#E4F2E8', marginBottom: 12 },
  availableDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#318454' },
  availableText: { fontFamily: fonts.sansSemi, fontSize: 11, color: '#1C653A' },
  name: { fontFamily: fonts.sansBold, fontSize: 23, color: colors.text, textAlign: 'center', marginBottom: 5 },
  specialty: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  rating: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text },
  sessions: { fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary },
  infoSection: { gap: 10, paddingVertical: 18, borderTopWidth: 1, borderTopColor: colors.border },
  sectionTitle: { fontFamily: fonts.sansBold, fontSize: 17, color: colors.text },
  bio: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.textSecondary },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailText: { flex: 1, fontFamily: fonts.sans, fontSize: 13, color: colors.text },
  footer: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background },
  requestButton: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 16, backgroundColor: colors.primaryDark },
  requestButtonText: { fontFamily: fonts.sansSemi, fontSize: 15, color: '#FFFFFF' },
});