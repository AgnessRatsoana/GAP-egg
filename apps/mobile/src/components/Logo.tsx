import { Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors, fonts } from '../theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  taglineColor?: string;
  titleColor?: string;
}

export function Logo({
  size = 'md',
  showTagline = true,
  taglineColor = colors.brown,
  titleColor = colors.heading,
}: LogoProps) {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;
  const titleSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const tagSize = size === 'sm' ? 8 : size === 'lg' ? 10 : 9;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: size === 'sm' ? 10 : 12 }}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none">
        <Defs>
          <LinearGradient id="seaGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#367A8F" />
            <Stop offset="1" stopColor="#22596B" />
          </LinearGradient>
          <LinearGradient id="sunGrad" x1="16" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#E5A872" />
            <Stop offset="1" stopColor="#C27450" />
          </LinearGradient>
          <LinearGradient id="sageGrad" x1="20" y1="20" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#4E8468" />
            <Stop offset="1" stopColor="#2B5440" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="24"
          cy="24"
          r="22"
          stroke="url(#seaGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeDasharray="3 3"
        />
        <Path
          d="M 12 28 C 10 18, 20 8, 32 10 C 37 11, 40 14, 40 14 C 40 14, 35 12, 28 14 C 18 16, 14 24, 18 33 C 21 39, 29 41, 35 38 C 40 35, 42 30, 42 30 C 42 30, 38 37, 30 39 C 20 41, 13 36, 12 28 Z"
          fill="url(#seaGrad)"
          opacity="0.9"
        />
        <Circle cx="27" cy="20" r="6" fill="url(#sunGrad)" />
        <Path d="M 22 34 C 20 27, 26 21, 33 19 C 34 26, 29 32, 22 34 Z" fill="url(#sageGrad)" />
        <Path
          d="M 16 35 C 20 34, 24 36, 28 35 C 32 34, 35 35, 37 35"
          stroke="#367A8F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </Svg>
      <View>
        <Text
          style={{
            fontFamily: fonts.serifSemi,
            fontSize: titleSize,
            letterSpacing: 1.6,
            color: titleColor,
            lineHeight: titleSize * 1.15,
          }}
        >
          GAP A MONTH
        </Text>
        {showTagline && (
          <Text
            style={{
              fontFamily: fonts.sansSemi,
              fontSize: tagSize,
              letterSpacing: 1.3,
              color: taglineColor,
              marginTop: 3,
              textTransform: 'uppercase',
            }}
          >
            A season to return to yourself
          </Text>
        )}
      </View>
    </View>
  );
}
