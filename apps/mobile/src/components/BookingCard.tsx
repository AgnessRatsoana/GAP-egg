import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

type BookingCardProps = {
  title: string;
  subtitle: string;
  date: string;
  status: string;
  image?: number;
};

export function BookingCard({
  title,
  subtitle,
  date,
  status,
  image = require('../../../../media/gap-modal.jpeg'),
}: BookingCardProps) {
  return (
    <Pressable style={styles.card} accessibilityRole="button">
      <Image source={image} style={styles.image} contentFit="cover" />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.status}>{status}</Text>
          <View style={styles.metaPill}>
            <Ionicons name="calendar-outline" size={12} color={colors.card} />
            <Text style={styles.metaText}>{date}</Text>
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 26,
    height: 240,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    shadowColor: '#12362A',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(12, 27, 23, 0.32)',
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    padding: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontFamily: fonts.sansSemi,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.card,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.card,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 24,
    color: colors.card,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: 'rgba(255,255,255,0.84)',
  },
});
