import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import MapView, { Marker } from 'react-native-maps';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { initialProperties } from '../../src/data/mockData';
import { getSanctuaryGallery, getSanctuaryImage } from '../../src/data/sanctuaryImages';
import { colors, fonts } from '../../src/theme';

const tabs = ['about', 'gallery', 'reviews'] as const;
type TabKey = (typeof tabs)[number];

const propertyCoordinates: Record<string, { latitude: number; longitude: number }> = {
  'prop-001': { latitude: -33.9122, longitude: 18.4176 },
  'prop-002': { latitude: -33.9638, longitude: 18.3758 },
  'prop-003': { latitude: -34.0356, longitude: 23.0488 },
  'prop-004': { latitude: -26.2041, longitude: 28.0473 },
};

const amenityIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  wifi: 'wifi-outline',
  parking: 'car-outline',
  pool: 'water-outline',
  air: 'snow-outline',
  garden: 'leaf-outline',
  kitchen: 'restaurant-outline',
  workspace: 'laptop-outline',
  security: 'shield-checkmark-outline',
  beach: 'sunny-outline',
  view: 'sparkles-outline',
  shower: 'rainy-outline',
  heating: 'thermometer-outline',
  laundry: 'shirt-outline',
  pet: 'paw-outline',
  meditation: 'flower-outline',
  quiet: 'volume-mute-outline',
  support: 'medical-outline',
};

export default function PropertyDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const property = initialProperties.find((item) => item.id === params.id) ?? initialProperties[0];
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  const coordinates = propertyCoordinates[property.id] ?? { latitude: -33.9249, longitude: 18.4241 };
  const galleryImages = useMemo(() => getSanctuaryGallery(property.id), [property.id]);

  const activeIndex = tabs.indexOf(activeTab);
  const placeSize = property.category === 'beachfront' ? 160 : property.bedrooms > 2 ? 220 : 120;

  const openMaps = () => {
    const url = `https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}`;
    Linking.openURL(url);
  };

  const shareProperty = async () => {
    try {
      await Share.share({
        title: property.title,
        message: `${property.title}\n${property.city}\n\n${property.description}`,
      });
    } catch {
      // The platform share sheet can be dismissed without completing a share.
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <Pressable style={styles.headerButton} accessibilityRole="button" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={colors.primaryDark} />
            </Pressable>

            <Pressable
              style={styles.headerButton}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
              onPress={() => setIsFavorite((value) => !value)}
            >
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={colors.primaryDark} />
            </Pressable>
          </View>

          <Image source={getSanctuaryImage(property.id)} style={styles.heroImage} contentFit="cover" />

          <View style={styles.contentWrap}>
            <View style={styles.typeRow}>
              <Text style={styles.type}>{property.propertyType}</Text>
              <Pressable
                style={styles.shareButton}
                accessibilityRole="button"
                accessibilityLabel={`Share ${property.title}`}
                onPress={shareProperty}
              >
                <Ionicons name="share-social-outline" size={19} color={colors.accent} />
              </Pressable>
            </View>
            <Text style={styles.title}>{property.title}</Text>

            <View style={styles.topMetaRow}>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={14} color={colors.accent} />
                <Text style={styles.ratingText}>{property.rating ?? 4.9}</Text>
              </View>

              <Pressable onPress={() => setActiveTab('reviews')}>
                <Text style={styles.reviewCountText}>({property.reviewCount ?? 128} reviews)</Text>
              </Pressable>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color={colors.primaryDark} />
              <Text style={styles.locationText}>{property.city}</Text>
            </View>

            <View style={styles.tabContainer}>
              <View style={styles.tabRow}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <Pressable
                      key={tab}
                      accessibilityRole="button"
                      style={styles.tabButton}
                      onPress={() => setActiveTab(tab)}
                    >
                      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                        {tab === 'about' ? 'About' : tab === 'gallery' ? 'Gallery' : 'Reviews'}
                      </Text>
                    </Pressable>
                  );
                })}
                <View style={[styles.tabUnderline, { left: `${activeIndex * 33.333}%`, width: '33.333%' }]} />
              </View>
            </View>

            <View style={styles.infoStats}>
              <View style={styles.statItem}>
                <View style={styles.statIconWrap}>
                  <Ionicons name="bed-outline" size={18} color={colors.primaryDark} />
                </View>
                <Text style={styles.statValue}>
                  {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIconWrap}>
                  <FontAwesome6 name="bath" size={18} color={colors.primaryDark} />
                </View>
                <Text style={styles.statValue}>
                  {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIconWrap}>
                  <MaterialCommunityIcons name="vector-square" size={18} color={colors.primaryDark} />
                </View>
                <Text style={styles.statValue}>{placeSize} m²</Text>
              </View>
            </View>

            {activeTab === 'about' && (
              <>
                <Text style={styles.description}>{property.description}</Text>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Location</Text>
                  <Pressable onPress={openMaps}>
                    <Text style={styles.linkText}>Open maps</Text>
                  </Pressable>
                </View>

                <Pressable style={styles.mapFrame} onPress={openMaps} accessibilityRole="button">
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: coordinates.latitude,
                      longitude: coordinates.longitude,
                      latitudeDelta: 0.06,
                      longitudeDelta: 0.06,
                    }}
                  >
                    <Marker
                      coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
                      title={property.title}
                      description={property.city}
                    />
                  </MapView>
                </Pressable>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Amenities</Text>
                </View>

                <View style={styles.amenityGrid}>
                  {property.amenities.slice(0, 6).map((item) => {
                    const normalized = item.toLowerCase();
                    const iconName =
                      Object.entries(amenityIcons).find(([key]) => normalized.includes(key))?.[1] ??
                      'sparkles-outline';

                    return (
                      <View key={item} style={styles.amenityItem}>
                        <View style={styles.amenityIconWrap}>
                          <Ionicons name={iconName} size={18} color={colors.primaryDark} />
                        </View>
                        <Text style={styles.amenityText}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}

            {activeTab === 'gallery' && (
              <View style={styles.galleryGrid}>
                {galleryImages.map((image, index) => (
                  <Image key={`${index}-${image}`} source={image} style={styles.galleryImage} contentFit="cover" />
                ))}
              </View>
            )}

            {activeTab === 'reviews' && (
              <View style={styles.reviewList}>
                <View style={styles.reviewSummary}>
                  <View style={styles.reviewSummaryBadge}>
                    <Ionicons name="star" size={18} color={colors.accent} />
                    <Text style={styles.reviewSummaryText}>{property.rating ?? 4.9}</Text>
                  </View>
                  <Text style={styles.reviewSummaryLabel}>{property.reviewCount ?? 128} guest reviews</Text>
                </View>

                {(property.reviews ?? []).slice(0, 3).map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewAuthor}>{review.author}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>

                    <View style={styles.reviewStars}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Ionicons
                          key={`${review.id}-${index}`}
                          name={index < Math.round(review.rating) ? 'star' : 'star-outline'}
                          size={14}
                          color={colors.accent}
                        />
                      ))}
                    </View>

                    <Text style={styles.reviewText}>{review.content}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.bookingBar}>
          <View>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.priceValue}>R {property.nightlyPrice?.toLocaleString() ?? '1,850'}</Text>
          </View>

          <Pressable
            style={styles.bookingButton}
            accessibilityRole="button"
            accessibilityLabel={`Book a stay at ${property.title}`}
            onPress={() => router.push({ pathname: '/booking/[id]', params: { id: property.id } })}
          >
            <Text style={styles.bookingButtonText}>Book now</Text>
          </Pressable>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(21,91,70,0.12)',
  },
  heroImage: {
    width: '100%',
    height: 290,
  },
  contentWrap: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -18,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  type: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    marginBottom: 0,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  shareButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.accentTint,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 30,
    color: colors.text,
    marginBottom: 12,
  },
  topMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.sage,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ratingText: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.primaryDark,
  },
  linkText: {
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.secondaryGreen,
  },
  reviewCountText: {
    fontFamily: fonts.sansSemi,
    fontSize: 13,
    color: colors.accent,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 18,
  },
  locationText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSecondary,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 20,
  },
  tabRow: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  activeTabText: {
    fontFamily: fonts.sansSemi,
    color: colors.primaryDark,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primaryDark,
  },
  infoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 22,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  mapFrame: {
    height: 170,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 26,
  },
  amenityItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  amenityIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.text,
    flexShrink: 1,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  galleryImage: {
    width: '48%',
    height: 150,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewList: {
    gap: 14,
    marginBottom: 16,
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  reviewSummaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.sage,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  reviewSummaryText: {
    fontFamily: fonts.sansSemi,
    fontSize: 16,
    color: colors.primaryDark,
  },
  reviewSummaryLabel: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textSecondary,
  },
  reviewItem: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    color: colors.text,
  },
  reviewDate: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 3,
  },
  reviewText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  bookingBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 18,
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#18332A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  priceLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceValue: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.primaryDark,
  },
  bookingButton: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
  },
  bookingButtonText: {
    color: '#FFFFFF',
    fontFamily: fonts.sansSemi,
    fontSize: 15,
  },
});
