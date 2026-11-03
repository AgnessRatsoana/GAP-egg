import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabs } from '../src/components/BottomTabs';
import { initialProperties } from '../src/data/mockData';
import { getSanctuaryImage } from '../src/data/sanctuaryImages';
import { colors, fonts } from '../src/theme';

const currentUserName = 'Aaliyah';
const minimumStayDays = 30;
const daysStayed = 8;
const daysRemaining = Math.max(minimumStayDays - daysStayed, 0);
const currentStay = initialProperties.find((property) => property.id === 'prop-002') ?? initialProperties[1];

const activityItems = [
  { count: '2', label: 'Upcoming appointments', icon: 'calendar-outline' as const },
  { count: '3', label: 'Unread messages', icon: 'chatbubble-ellipses-outline' as const },
  { count: '1', label: 'Active support request', icon: 'help-buoy-outline' as const },
];

const sanctuaryHistory = [
  {
    title: 'Therapy session',
    detail: 'Completed · 50 minutes with your wellbeing therapist',
    time: 'Today · 9:00 AM',
    icon: 'heart-outline' as const,
  },
  {
    title: 'Coastal cardio walk',
    detail: 'Completed · 35 minutes along the shoreline',
    time: 'Yesterday · 7:30 AM',
    icon: 'walk-outline' as const,
  },
  {
    title: 'Guided meditation',
    detail: 'Completed · 20-minute morning reset',
    time: 'Nov 1 · 8:15 AM',
    icon: 'leaf-outline' as const,
  },
  {
    title: 'Creative journaling',
    detail: 'A quiet afternoon activity in the sanctuary garden',
    time: 'Oct 31 · 4:00 PM',
    icon: 'book-outline' as const,
  },
];

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function MyStayScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>{getTimeGreeting()},</Text>
            <Text style={styles.userName}>{currentUserName}</Text>
          </View>

          <Text style={styles.pageTitle}>Your gap month journey</Text>

          <View style={styles.currentStaySection}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Currently staying at</Text>
              <Text style={styles.activeStayStatus}>Active stay</Text>
            </View>
            <View style={styles.currentStayCard}>
              <Image
                source={getSanctuaryImage(currentStay.id)}
                style={styles.currentStayImage}
                contentFit="cover"
                accessibilityLabel={`${currentStay.title} sanctuary`}
              />
              <View style={styles.currentStayDetails}>
                <Text style={styles.currentStayName}>{currentStay.title}</Text>
                <Text style={styles.currentStayLocation}>{currentStay.city}</Text>
              </View>
            </View>
          </View>

          <View style={styles.stayDurationCard}>
            <View style={styles.durationHeading}>
              <Text style={styles.sectionTitle}>Your 30-day stay</Text>
              <Text style={styles.durationStatus}>Day {daysStayed} of {minimumStayDays}</Text>
            </View>
            <View style={styles.durationStats}>
              <View style={styles.durationStat}>
                <Text style={styles.durationValue}>{daysStayed}</Text>
                <Text style={styles.durationLabel}>Days stayed</Text>
              </View>
              <View style={styles.durationDivider} />
              <View style={styles.durationStat}>
                <Text style={styles.durationValue}>{daysRemaining}</Text>
                <Text style={styles.durationLabel}>Days remaining</Text>
              </View>
            </View>
            <View style={styles.durationTrack}>
              <View
                style={[
                  styles.durationProgress,
                  { width: `${Math.min((daysStayed / minimumStayDays) * 100, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.durationNote}>Minimum stay: 30 days</Text>
          </View>

          <View style={styles.activityCard}>
            {activityItems.map((item, index) => (
              <View
                key={item.label}
                style={[styles.activityItem, index > 0 && styles.activityItemBorder]}
              >
                <Ionicons name={item.icon} size={19} color={colors.secondaryGreen} />
                <Text style={styles.activityCount}>{item.count}</Text>
                <Text style={styles.activityLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Today&apos;s schedule</Text>
            <View style={styles.scheduleItem}>
              <View style={styles.scheduleIcon}>
                <Ionicons name="leaf-outline" size={20} color={colors.primaryDark} />
              </View>
              <View style={styles.scheduleCopy}>
                <Text style={styles.scheduleTitle}>Wellbeing check-in</Text>
                <Text style={styles.scheduleMeta}>10:00 AM · 20 minutes</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </View>
          </View>

          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Activity at this sanctuary</Text>
            <View style={styles.historyList}>
              {sanctuaryHistory.map((item, index) => (
                <View key={item.title} style={styles.historyItem}>
                  <View style={styles.historyTimeline}>
                    <View style={styles.historyIcon}>
                      <Ionicons name={item.icon} size={16} color={colors.primaryDark} />
                    </View>
                    {index < sanctuaryHistory.length - 1 && <View style={styles.historyConnector} />}
                  </View>
                  <View style={styles.historyCopy}>
                    <View style={styles.historyTitleRow}>
                      <Text style={styles.historyTitle}>{item.title}</Text>
                      <Text style={styles.historyTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.historyDetail}>{item.detail}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>

        <View style={styles.navWrapper}>
          <BottomTabs activeTab="stay" />
        </View>
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
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  greetingBlock: {
    marginBottom: 20,
  },
  greeting: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSecondary,
  },
  userName: {
    fontFamily: fonts.sansBold,
    fontSize: 27,
    color: colors.primaryDark,
    marginTop: 2,
  },
  pageTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 23,
    color: colors.text,
    marginBottom: 14,
  },
  currentStaySection: {
    marginBottom: 18,
  },
  activeStayStatus: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    color: colors.primaryDark,
    backgroundColor: colors.sage,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  currentStayCard: {
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  currentStayImage: {
    width: '100%',
    height: 175,
    backgroundColor: colors.sage,
  },
  currentStayDetails: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    gap: 4,
  },
  currentStayName: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    color: colors.text,
  },
  currentStayLocation: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  stayDurationCard: {
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 22,
  },
  durationHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },
  durationStatus: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    color: colors.secondaryGreen,
  },
  durationStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  durationStat: {
    flex: 1,
    gap: 2,
  },
  durationDivider: {
    width: 1,
    height: 34,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  durationValue: {
    fontFamily: fonts.sansBold,
    fontSize: 24,
    color: colors.primaryDark,
  },
  durationLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  durationTrack: {
    height: 6,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.sage,
    marginBottom: 8,
  },
  durationProgress: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primaryDark,
  },
  durationNote: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textSecondary,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 19,
    color: colors.text,
  },
  sectionMeta: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: 15,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  activityItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 7,
  },
  activityItemBorder: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  activityCount: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    color: colors.primaryDark,
  },
  activityLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    lineHeight: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scheduleSection: {
    gap: 12,
  },
  scheduleItem: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scheduleIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sage,
  },
  scheduleCopy: {
    flex: 1,
    gap: 4,
  },
  scheduleTitle: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.text,
  },
  scheduleMeta: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  historySection: {
    gap: 12,
    marginTop: 24,
  },
  historyList: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyItem: {
    minHeight: 72,
    flexDirection: 'row',
    gap: 12,
  },
  historyTimeline: {
    alignItems: 'center',
    width: 32,
  },
  historyIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sage,
    zIndex: 1,
  },
  historyConnector: {
    position: 'absolute',
    top: 30,
    bottom: 0,
    width: 1,
    backgroundColor: colors.border,
  },
  historyCopy: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 12,
    gap: 5,
  },
  historyTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  historyTitle: {
    flex: 1,
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.text,
  },
  historyTime: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textSecondary,
  },
  historyDetail: {
    fontFamily: fonts.sans,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  navWrapper: {
    marginTop: 8,
  },
});