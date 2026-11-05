import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';
import { getSanctuaryImage } from '../data/sanctuaryImages';
import { Property } from '../types';

type PlaceCardProps = {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
};

function getPlaceTypeLabel(propertyType: Property['propertyType']) {
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
      return 'Stay';
  }
}

export function PlaceCard({ property, isFavorite = false, onToggleFavorite }: PlaceCardProps) {
  return (
    <Pressable
      style={styles.card}
      accessibilityRole="button"
      onPress={() => router.push({ pathname: '/place/[id]', params: { id: property.id } })}
    >
      <View style={styles.imageWrap}>
        <Image source={getSanctuaryImage(property.id)} style={styles.image} contentFit="cover" />

        <Pressable
          style={styles.favoriteButton}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          onPress={(event) => {
            event.stopPropagation?.();
            onToggleFavorite?.(property.id);
          }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#E05656' : colors.primaryDark}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.type}>{getPlaceTypeLabel(property.propertyType)}</Text>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <Text style={styles.location} numberOfLines={1}>{property.city}</Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingWrap}>
            <Ionicons name="star" size={14} color={colors.accent} />
            <Text style={styles.ratingText}>{property.rating ?? 4.9}</Text>
          </View>
          <Text style={styles.reviewText}>({property.reviewCount ?? 128} reviews)</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>R {property.nightlyPrice?.toLocaleString() ?? '1,850'}</Text>
          <Text style={styles.perNight}>/ night</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 270,
    height: 300,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 16,
    shadowColor: '#12362A',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  imageWrap: {
    height: 158,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.94)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 13,
  },
  type: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    textTransform: 'uppercase',
    color: colors.secondaryGreen,
    marginBottom: 3,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 17,
    color: colors.text,
    marginBottom: 2,
  },
  location: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 7,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  ratingText: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    color: colors.text,
  },
  reviewText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontFamily: fonts.sansBold,
    fontSize: 17,
    color: colors.primaryDark,
  },
  perNight: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});
