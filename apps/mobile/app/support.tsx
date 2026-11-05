import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabs } from '../src/components/BottomTabs';
import { supportCategories, supportProfessionals, SupportCategory } from '../src/data/supportProfessionals';
import { colors, fonts } from '../src/theme';

type CategoryFilter = 'all' | SupportCategory;

export default function SupportScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false);
  const [customService, setCustomService] = useState('');

  const visibleProfessionals = useMemo(
    () => selectedCategory === 'all'
      ? supportProfessionals
      : supportProfessionals.filter((professional) => professional.category === selectedCategory),
    [selectedCategory]
  );

  const openCustomRequest = () => {
    const service = customService.trim();
    if (service) router.push({ pathname: '/request-service', params: { customService: service } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headingBlock}>
            <Text style={styles.eyebrow}>PERSONALISED CARE</Text>
            <Text style={styles.pageTitle}>Support Services</Text>
            <Text style={styles.pageDescription}>
              Access professional support from our trusted and approved service providers.
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {supportCategories.map((category) => {
              const isSelected = selectedCategory === category.value;
              return (
                <Pressable
                  key={category.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                  onPress={() => setSelectedCategory(category.value)}
                >
                  <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
                    {category.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.listHeading}>
            <Text style={styles.sectionTitle}>Available professionals</Text>
            <Text style={styles.resultCount}>{visibleProfessionals.length}</Text>
          </View>

          <View style={styles.professionalList}>
            {visibleProfessionals.map((professional) => (
              <Pressable
                key={professional.id}
                style={styles.professionalRow}
                accessibilityRole="button"
                accessibilityLabel={`View ${professional.name}'s profile`}
                onPress={() => router.push({ pathname: '/professional/[id]', params: { id: professional.id } })}
              >
                <Image source={professional.photo} style={styles.avatar} contentFit="cover" />
                <View style={styles.professionalCopy}>
                  <Text numberOfLines={1} style={styles.professionalName}>{professional.name}</Text>
                  <Text numberOfLines={1} style={styles.specialty}>{professional.specialty}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={13} color={colors.accent} />
                    <Text style={styles.rating}>{professional.rating.toFixed(2)}</Text>
                    <Text style={styles.sessionCount}>· {professional.completedSessions} sessions</Text>
                  </View>
                </View>
                <View style={styles.availableTag}>
                  <View style={styles.availableDot} />
                  <Text style={styles.availableText}>Available</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={styles.customServiceBlock}>
            <Pressable
              style={styles.customServiceToggle}
              accessibilityRole="button"
              accessibilityState={{ expanded: isCustomRequestOpen }}
              onPress={() => setIsCustomRequestOpen((open) => !open)}
            >
              <View style={styles.customIcon}>
                <Ionicons name="add" size={22} color={colors.primaryDark} />
              </View>
              <View style={styles.customCopy}>
                <Text style={styles.customTitle}>Looking for another service?</Text>
                <Text style={styles.customDescription}>Tell us what kind of support you need.</Text>
              </View>
              <Ionicons
                name={isCustomRequestOpen ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={colors.primaryDark}
              />
            </Pressable>

            {isCustomRequestOpen && (
              <View style={styles.customForm}>
                <TextInput
                  value={customService}
                  onChangeText={setCustomService}
                  placeholder="Describe the service you need"
                  placeholderTextColor={colors.textSecondary}
                  style={styles.customInput}
                  accessibilityLabel="Describe a different support service"
                  returnKeyType="done"
                />
                <Pressable
                  style={[styles.customSubmit, !customService.trim() && styles.customSubmitDisabled]}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: !customService.trim() }}
                  onPress={openCustomRequest}
                >
                  <Text style={styles.customSubmitText}>Continue to request</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.navWrapper}>
          <BottomTabs activeTab="support" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 18, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 22 },
  headingBlock: { marginBottom: 18 },
  eyebrow: { fontFamily: fonts.sansSemi, fontSize: 10, color: colors.secondaryGreen, marginBottom: 5 },
  pageTitle: { fontFamily: fonts.sansBold, fontSize: 27, color: colors.text, marginBottom: 7 },
  pageDescription: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSecondary },
  filters: { gap: 8, paddingBottom: 20 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  filterChipSelected: { borderColor: colors.primaryDark, backgroundColor: colors.primaryDark },
  filterText: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.textSecondary },
  filterTextSelected: { fontFamily: fonts.sansSemi, color: '#FFFFFF' },
  listHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.sansBold, fontSize: 17, color: colors.text },
  resultCount: { fontFamily: fonts.sansSemi, fontSize: 12, color: colors.textSecondary },
  professionalList: { gap: 8 },
  professionalRow: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 11, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.sage },
  professionalCopy: { flex: 1, gap: 4 },
  professionalName: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text },
  specialty: { fontFamily: fonts.sans, fontSize: 11, color: colors.textSecondary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 },
  rating: { fontFamily: fonts.sansSemi, fontSize: 11, color: colors.text },
  sessionCount: { fontFamily: fonts.sans, fontSize: 10, color: colors.textSecondary },
  availableTag: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 999, backgroundColor: '#E4F2E8' },
  availableDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#318454' },
  availableText: { fontFamily: fonts.sansSemi, fontSize: 9, color: '#1C653A' },
  customServiceBlock: { marginTop: 18, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  customServiceToggle: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  customIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.sage },
  customCopy: { flex: 1, gap: 3 },
  customTitle: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text },
  customDescription: { fontFamily: fonts.sans, fontSize: 11, color: colors.textSecondary },
  customForm: { gap: 10, marginTop: 14 },
  customInput: { minHeight: 46, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 13, fontFamily: fonts.sans, fontSize: 13, color: colors.text, backgroundColor: colors.background },
  customSubmit: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 13, backgroundColor: colors.primaryDark },
  customSubmitDisabled: { opacity: 0.5 },
  customSubmitText: { fontFamily: fonts.sansSemi, fontSize: 13, color: '#FFFFFF' },
  navWrapper: { marginTop: 8 },
});