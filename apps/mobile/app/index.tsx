import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookingCard } from '../src/components/BookingCard';
import { BottomTabs } from '../src/components/BottomTabs';
import { PlaceCard } from '../src/components/PlaceCard';
import { initialProperties } from '../src/data/mockData';
import { colors, fonts } from '../src/theme';

const provinceOptions = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Mpumalanga'];
const typeOptions = ['All', 'Hotel', 'Farmhouse', 'Motel', 'Beach House', 'Retreat'];
const currentUserName = 'Aaliyah';
function getDisplayType(propertyType: string) {
  switch (propertyType) {
    case 'studio':
      return 'Hotel';
    case 'cottage':
      return 'Farmhouse';
    case 'guest_suite':
      return 'Motel';
    case 'apartment':
      return 'Beach House';
    case 'retreat_villa':
      return 'Retreat';
    default:
      return 'Farmhouse';
  }
}

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function WelcomeHomeScreen() {
  const [selectedProvince, setSelectedProvince] = useState('Gauteng');
  const [selectedType, setSelectedType] = useState('All');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [emergencyTriageOnly, setEmergencyTriageOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const videoPlayer = useVideoPlayer(require('../../../media/carousel.mp4'), (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  useEffect(() => {
    const subscription = videoPlayer.addListener('playToEnd', () => videoPlayer.replay());
    return () => subscription.remove();
  }, [videoPlayer]);

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const today = getLocalDateKey(new Date());

    return initialProperties.filter((property) => {
      const provinceMatch = selectedProvince === 'Gauteng' ? true : property.province === selectedProvince;
      const typeMatch = selectedType === 'All' || getDisplayType(property.propertyType) === selectedType;
      const availabilityMatch = !emergencyTriageOnly || (
        property.verificationStatus === 'approved' &&
        property.availabilityStart <= today &&
        property.availabilityEnd >= today
      );
      const matchesQuery =
        !normalizedQuery ||
        property.title.toLowerCase().includes(normalizedQuery) ||
        property.city.toLowerCase().includes(normalizedQuery) ||
        property.province.toLowerCase().includes(normalizedQuery) ||
        property.address.toLowerCase().includes(normalizedQuery) ||
        property.description.toLowerCase().includes(normalizedQuery);

      return provinceMatch && typeMatch && availabilityMatch && matchesQuery;
    });
  }, [emergencyTriageOnly, searchQuery, selectedProvince, selectedType]);

  const recommendedPlaces = useMemo(
    () => [...filteredPlaces].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 3),
    [filteredPlaces]
  );

  const nearbyPlaces = useMemo(() => {
    const list = filteredPlaces.length > 0 || emergencyTriageOnly ? filteredPlaces : initialProperties;
    return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 4);
  }, [emergencyTriageOnly, filteredPlaces]);

  const popularPlaces = useMemo(
    () => [...filteredPlaces].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)).slice(0, 3),
    [filteredPlaces]
  );

  const toggleFavorite = (propertyId: string) => {
    setFavoriteIds((current) =>
      current.includes(propertyId) ? current.filter((id) => id !== propertyId) : [...current, propertyId]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Welcome back, {currentUserName}</Text>
            <Text style={styles.summaryTitle}>Your calm, safe place waits.</Text>
            <Text style={styles.summaryText}>
              You have 2 upcoming stays and 1 wellbeing check-in scheduled this week.
            </Text>
          </View>

          <View style={styles.quickActions}>
            <Pressable style={styles.actionPill} accessibilityRole="button">
              <Ionicons name="calendar-outline" size={18} color={colors.primaryDark} />
              <Text style={styles.actionLabel}>Book now</Text>
            </Pressable>
            <Pressable style={styles.actionPill} accessibilityRole="button">
              <Ionicons name="sparkles-outline" size={18} color={colors.primaryDark} />
              <Text style={styles.actionLabel}>My care plan</Text>
            </Pressable>
          </View>

          <View style={styles.videoCarousel}>
            <VideoView
              player={videoPlayer}
              style={styles.carouselVideo}
              contentFit="cover"
              nativeControls={false}
              allowsPictureInPicture={false}
            />
          </View>

          <View style={styles.searchCard}>
            <Text style={styles.searchTitle}>Where would you like to go?</Text>

            <Pressable
              style={styles.locationSelect}
              accessibilityRole="button"
              onPress={() => setIsProvinceOpen((value) => !value)}
            >
              <View style={styles.locationLabelWrap}>
                <Ionicons name="location-outline" size={18} color={colors.primaryDark} />
                <Text style={styles.locationValue}>{selectedProvince}</Text>
              </View>
              <Ionicons name={isProvinceOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.primaryDark} />
            </Pressable>

            {isProvinceOpen && (
              <View style={styles.dropdownMenu}>
                {provinceOptions.map((province) => (
                  <Pressable
                    key={province}
                    accessibilityRole="button"
                    style={[styles.dropdownItem, province === selectedProvince && styles.dropdownItemActive]}
                    onPress={() => {
                      setSelectedProvince(province);
                      setIsProvinceOpen(false);
                    }}
                  >
                    <Text style={[styles.dropdownItemText, province === selectedProvince && styles.dropdownItemActiveText]}>
                      {province}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            <View style={styles.searchRow}>
              <View style={styles.searchInputWrap}>
                <Ionicons name="search-outline" size={18} color={colors.textSecondary} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search sanctuary, location, or keywords"
                  placeholderTextColor={colors.textSecondary}
                  style={styles.searchInput}
                />
              </View>

              <Pressable
                style={[styles.filterButton, isFiltersOpen && styles.filterButtonActive]}
                accessibilityRole="button"
                accessibilityLabel="Toggle property type filters"
                accessibilityState={{ expanded: isFiltersOpen }}
                onPress={() => setIsFiltersOpen((value) => !value)}
              >
                <Ionicons name="options-outline" size={18} color={colors.primaryDark} />
              </Pressable>
            </View>

            {isFiltersOpen && (
              <View style={styles.filterTags}>
                {typeOptions.map((type) => {
                  const isSelected = selectedType === type;
                  return (
                    <Pressable
                      key={type}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      style={[styles.filterTag, isSelected && styles.filterTagSelected]}
                      onPress={() => setSelectedType(type)}
                    >
                      <Text style={[styles.filterTagText, isSelected && styles.filterTagTextSelected]}>
                        {type}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            <Pressable
              style={styles.emergencyTriageButton}
              accessibilityRole="checkbox"
              accessibilityLabel="Filter for sanctuaries available today"
              accessibilityState={{ checked: emergencyTriageOnly }}
              onPress={() => setEmergencyTriageOnly((selected) => !selected)}
            >
              <View style={styles.emergencyTriageCopy}>
                <Text style={styles.emergencyTriageTitle}>Emergency Triage</Text>
                <Text style={styles.emergencyTriageDescription}>Show only sanctuaries available today</Text>
              </View>
              <View style={[styles.emergencyCheckbox, emergencyTriageOnly && styles.emergencyCheckboxSelected]}>
                {emergencyTriageOnly && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
              </View>
            </Pressable>
          </View>

          {emergencyTriageOnly && (
            <Text style={styles.emergencyTriageSelectedMessage}>
              Available sanctuaries for urgent intake
            </Text>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby sanctuaries</Text>
            <Text style={styles.viewAll}>See all</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
            {nearbyPlaces.length > 0 ? (
              nearbyPlaces.map((property) => (
                <PlaceCard
                  key={property.id}
                  property={property}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {emergencyTriageOnly ? 'No sanctuaries are available today.' : 'No nearby sanctuaries found.'}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended places</Text>
            <Text style={styles.viewAll}>See all</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
            {recommendedPlaces.length > 0 ? (
              recommendedPlaces.map((property) => (
                <PlaceCard
                  key={property.id}
                  property={property}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No places match these filters yet.</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular places</Text>
            <Text style={styles.viewAll}>See all</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
            {popularPlaces.length > 0 ? (
              popularPlaces.map((property) => (
                <PlaceCard
                  key={property.id}
                  property={property}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No popular places in this selection.</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your bookings</Text>
            <Pressable accessibilityRole="button">
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>

          <BookingCard
            title="Rosewood Sanctuary"
            subtitle="Private room · 12 nights · Wellness support included"
            date="14–26 Nov"
            status="Confirmed"
          />

          <View style={styles.smallCards}>
            <View style={styles.smallCard}>
              <Text style={styles.smallCardLabel}>Next check-in</Text>
              <Text style={styles.smallCardValue}>Tue, 10:00</Text>
            </View>

            <View style={styles.smallCard}>
              <Text style={styles.smallCardLabel}>Support contact</Text>
              <Text style={styles.smallCardValue}>Maya • 2 mins</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.navWrapper}>
          <BottomTabs activeTab="home" />
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
    paddingTop: 10,
    paddingBottom: 18,
  },
  scrollContent: {
    paddingBottom: 18,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    shadowColor: '#173029',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  summaryLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.primaryDark,
    marginBottom: 8,
  },
  summaryTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 30,
    color: colors.text,
    lineHeight: 36,
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  videoCarousel: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: colors.sage,
    marginBottom: 20,
  },
  carouselVideo: {
    width: '100%',
    height: '100%',
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.sage,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
  },
  actionLabel: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.primaryDark,
  },
  searchCard: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  searchTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
    marginBottom: 14,
  },
  locationSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  locationLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationValue: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    color: colors.text,
  },
  dropdownMenu: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemActive: {
    backgroundColor: colors.sage,
  },
  dropdownItemText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
  },
  dropdownItemActiveText: {
    fontFamily: fonts.sansSemi,
    color: colors.primaryDark,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 0,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.sage,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.background,
    borderColor: colors.primaryDark,
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  filterTag: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterTagSelected: {
    borderColor: colors.primaryDark,
    backgroundColor: colors.sage,
  },
  filterTagText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textSecondary,
  },
  filterTagTextSelected: {
    fontFamily: fonts.sansSemi,
    color: colors.primaryDark,
  },
  emergencyTriageButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  emergencyTriageCopy: {
    flex: 1,
    gap: 3,
  },
  emergencyTriageTitle: {
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.accent,
  },
  emergencyTriageDescription: {
    fontFamily: fonts.sans,
    fontSize: 10,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  emergencyCheckbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.accent,
    backgroundColor: colors.card,
  },
  emergencyCheckboxSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  emergencyTriageSelectedMessage: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    color: colors.accent,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  viewAll: {
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.secondaryGreen,
  },
  cardRow: {
    paddingBottom: 12,
  },
  emptyState: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  smallCards: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  smallCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    shadowColor: '#173029',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  smallCardLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  smallCardValue: {
    fontFamily: fonts.sansSemi,
    fontSize: 16,
    color: colors.text,
  },
  navWrapper: {
    marginTop: 8,
  },
});
