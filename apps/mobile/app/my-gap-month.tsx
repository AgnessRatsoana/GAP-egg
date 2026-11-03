import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { initialProperties } from '../src/data/mockData';
import { getSanctuaryImage } from '../src/data/sanctuaryImages';
import { colors, fonts } from '../src/theme';

const application = {
  status: 'Under review',
  intendedArrival: '18 Nov 2026',
  intendedDeparture: '18 Dec 2026',
  nights: 30,
};

const selectedSanctuary = initialProperties.find((property) => property.id === 'prop-001') ?? initialProperties[0];
const accommodationPrice = selectedSanctuary.monthlyRate ?? (selectedSanctuary.nightlyPrice ?? 0) * application.nights;
const cleaningFee = selectedSanctuary.cleaningFee ?? 0;
const serviceFee = selectedSanctuary.serviceFee ?? 0;
const estimatedTotal = accommodationPrice + cleaningFee + serviceFee;

const applicationUpdates = [
  {
    title: 'Application submitted',
    detail: 'Your application and intended stay dates have been received.',
    time: '03 Nov 2026',
    state: 'complete' as const,
    icon: 'checkmark' as const,
  },
  {
    title: 'Eligibility review',
    detail: 'The care team is reviewing your application.',
    time: 'In progress',
    state: 'current' as const,
    icon: 'time-outline' as const,
  },
  {
    title: 'Care team call',
    detail: 'Your next step will be shared after the review is complete.',
    time: 'Up next',
    state: 'upcoming' as const,
    icon: 'call-outline' as const,
  },
];

function formatZar(amount: number) {
  return `R ${amount.toLocaleString('en-ZA')}`;
}

export default function MyGapMonthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>YOUR APPLICATION</Text>
            <Text style={styles.pageTitle}>My Gap Month</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.statusBanner}>
            <View style={styles.statusIcon}>
              <Ionicons name="document-text-outline" size={21} color={colors.primaryDark} />
            </View>
            <View style={styles.statusCopy}>
              <Text style={styles.statusHeading}>Application received</Text>
              <Text style={styles.statusDescription}>Your 30-day stay request is being reviewed.</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{application.status}</Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Selected sanctuary</Text>
            <Text style={styles.mockLabel}>Application preview</Text>
          </View>
          <Pressable
            style={styles.sanctuaryCard}
            accessibilityRole="button"
            accessibilityLabel={`View ${selectedSanctuary.title}`}
            onPress={() => router.push({ pathname: '/place/[id]', params: { id: selectedSanctuary.id } })}
          >
            <Image
              source={getSanctuaryImage(selectedSanctuary.id)}
              style={styles.sanctuaryImage}
              contentFit="cover"
              accessibilityLabel={`${selectedSanctuary.title} sanctuary`}
            />
            <View style={styles.sanctuaryCopy}>
              <View style={styles.sanctuaryText}>
                <Text style={styles.sanctuaryName}>{selectedSanctuary.title}</Text>
                <Text style={styles.sanctuaryLocation}>{selectedSanctuary.city}</Text>
              </View>
              <Ionicons name="open-outline" size={18} color={colors.secondaryGreen} />
            </View>
          </Pressable>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Intended stay</Text>
            <Text style={styles.stayLength}>{application.nights} nights</Text>
          </View>
          <View style={styles.datesCard}>
            <View style={styles.dateCell}>
              <Text style={styles.fieldLabel}>ARRIVAL</Text>
              <Text style={styles.dateValue}>{application.intendedArrival}</Text>
            </View>
            <View style={styles.dateDivider} />
            <View style={styles.dateCell}>
              <Text style={styles.fieldLabel}>DEPARTURE</Text>
              <Text style={styles.dateValue}>{application.intendedDeparture}</Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Estimated pricing</Text>
            <Text style={styles.mockLabel}>30-night stay</Text>
          </View>
          <View style={styles.pricingCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Sanctuary accommodation</Text>
              <Text style={styles.priceValue}>{formatZar(accommodationPrice)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Cleaning fee</Text>
              <Text style={styles.priceValue}>{formatZar(cleaningFee)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service fee</Text>
              <Text style={styles.priceValue}>{formatZar(serviceFee)}</Text>
            </View>
            <View style={styles.totalRow}>
              <View style={styles.totalCopy}>
                <Text style={styles.totalLabel}>Estimated total</Text>
                <Text style={styles.totalNote}>Final amount confirmed after review</Text>
              </View>
              <Text style={styles.totalValue}>{formatZar(estimatedTotal)}</Text>
            </View>
          </View>

          <View style={styles.feedHeading}>
            <Text style={styles.sectionTitle}>Application updates</Text>
            <Text style={styles.feedCount}>3 updates</Text>
          </View>
          <View style={styles.feedCard}>
            {applicationUpdates.map((update, index) => (
              <View key={update.title} style={styles.updateRow}>
                <View style={styles.updateTimeline}>
                  <View
                    style={[
                      styles.updateIcon,
                      update.state === 'complete' && styles.updateIconComplete,
                      update.state === 'current' && styles.updateIconCurrent,
                    ]}
                  >
                    <Ionicons
                      name={update.icon}
                      size={15}
                      color={update.state === 'upcoming' ? colors.textSecondary : colors.primaryDark}
                    />
                  </View>
                  {index < applicationUpdates.length - 1 && <View style={styles.updateConnector} />}
                </View>
                <View style={styles.updateContent}>
                  <View style={styles.updateTitleRow}>
                    <Text style={styles.updateTitle}>{update.title}</Text>
                    <Text style={styles.updateTime}>{update.time}</Text>
                  </View>
                  <Text style={styles.updateDetail}>{update.detail}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.disclaimer}>This is a mock application preview. Details and pricing are for demonstration.</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerCopy: {
    gap: 2,
  },
  eyebrow: {
    fontFamily: fonts.sansSemi,
    fontSize: 10,
    color: colors.secondaryGreen,
  },
  pageTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 14,
    marginBottom: 24,
    borderRadius: 18,
    backgroundColor: colors.sage,
  },
  statusIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  statusCopy: {
    flex: 1,
    gap: 3,
  },
  statusHeading: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.primaryDark,
  },
  statusDescription: {
    fontFamily: fonts.sans,
    fontSize: 11,
    lineHeight: 15,
    color: colors.textSecondary,
  },
  statusPill: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.card,
  },
  statusPillText: {
    fontFamily: fonts.sansSemi,
    fontSize: 10,
    color: colors.primaryDark,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 17,
    color: colors.text,
  },
  mockLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textSecondary,
  },
  sanctuaryCard: {
    overflow: 'hidden',
    marginBottom: 22,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sanctuaryImage: {
    width: '100%',
    height: 175,
    backgroundColor: colors.sage,
  },
  sanctuaryCopy: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sanctuaryText: {
    flex: 1,
    gap: 4,
  },
  sanctuaryName: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.text,
  },
  sanctuaryLocation: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  stayLength: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    color: colors.primaryDark,
  },
  datesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 22,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateCell: {
    flex: 1,
    gap: 7,
  },
  fieldLabel: {
    fontFamily: fonts.sansSemi,
    fontSize: 9,
    color: colors.textSecondary,
  },
  dateValue: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.text,
  },
  dateDivider: {
    width: 1,
    height: 40,
    marginHorizontal: 16,
    backgroundColor: colors.border,
  },
  pricingCard: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 24,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  priceLabel: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceValue: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    color: colors.text,
  },
  totalRow: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalCopy: {
    flex: 1,
    gap: 3,
  },
  totalLabel: {
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.primaryDark,
  },
  totalNote: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textSecondary,
  },
  totalValue: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.primaryDark,
  },
  feedHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  feedCount: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textSecondary,
  },
  feedCard: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  updateRow: {
    minHeight: 76,
    flexDirection: 'row',
    gap: 12,
  },
  updateTimeline: {
    width: 30,
    alignItems: 'center',
  },
  updateIcon: {
    zIndex: 1,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: colors.background,
  },
  updateIconComplete: {
    backgroundColor: colors.sage,
  },
  updateIconCurrent: {
    backgroundColor: colors.sage,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  updateConnector: {
    position: 'absolute',
    top: 28,
    bottom: 0,
    width: 1,
    backgroundColor: colors.border,
  },
  updateContent: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 12,
    gap: 5,
  },
  updateTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  updateTitle: {
    flex: 1,
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.text,
  },
  updateTime: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textSecondary,
  },
  updateDetail: {
    fontFamily: fonts.sans,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  disclaimer: {
    marginTop: 14,
    fontFamily: fonts.sans,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
