import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, fonts, shadowCard } from '../theme';

type IconName = keyof typeof Ionicons.glyphMap;

export function Eyebrow({ children, color = colors.sand, style }: { children: string; color?: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text
      style={[
        { fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color, textAlign: 'center' },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function SerifTitle({ children, size = 30, style }: { children: ReactNode; size?: number; style?: StyleProp<TextStyle> }) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.serif,
          fontSize: size,
          lineHeight: size * 1.2,
          color: colors.heading,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          textAlign: 'center',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Body({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return (
    <Text style={[{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: colors.muted }, style]}>{children}</Text>
  );
}

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'solid' | 'outline' | 'glass';
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, onPress, variant = 'solid', icon, style }: ButtonProps) {
  const solid = variant === 'solid';
  const glass = variant === 'glass';
  const fg = solid || glass ? '#FAF8F5' : colors.heading;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingVertical: 13,
          paddingHorizontal: 24,
          borderRadius: 4,
          borderWidth: 1,
          backgroundColor: solid ? colors.green : glass ? 'rgba(255,255,255,0.16)' : 'transparent',
          borderColor: solid ? colors.green : glass ? 'rgba(255,255,255,0.35)' : colors.borderStoneGold,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: fg }}>
        {label}
      </Text>
      {icon && <Ionicons name={icon} size={14} color={fg} />}
    </Pressable>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(255,255,255,0.94)',
          borderWidth: 1,
          borderColor: colors.borderColor,
          borderRadius: 6,
          overflow: 'hidden',
        },
        shadowCard,
        style,
      ]}
    >
      {children}
    </View>
  );
}
