import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Button, Card, Eyebrow } from '../src/components/ui';
import { colors, fonts } from '../src/theme';

const tabs = [
  { id: 'home', label: 'My Sanctuary Home', icon: 'home-outline' },
  { id: 'security', label: 'Identity & Security', icon: 'shield-outline' },
  { id: 'checkin', label: 'Daily Reflections', icon: 'happy-outline' },
  { id: 'comfort', label: 'Comfort & Pantry', icon: 'cafe-outline' },
  { id: 'support', label: 'Support Sessions', icon: 'heart-outline' },
  { id: 'know-me', label: 'Stay Preferences', icon: 'sparkles-outline' },
  { id: 'messages', label: 'Private Messages', icon: 'chatbubble-outline' },
] as const;

export default function PortalScreen() {
  const router = useRouter();
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('home');
  const current = tabs.find((t) => t.id === active)!;

  return (
    <Screen>
      <View style={{ padding: 20, paddingTop: 32, paddingBottom: 56 }}>
        <Eyebrow style={{ textAlign: 'left', letterSpacing: 2, marginBottom: 6 }}>Beneficiary sanctuary portal</Eyebrow>
        <Text style={{ fontFamily: fonts.serifMedium, fontSize: 32, color: colors.heading, marginBottom: 4 }}>
          Welcome to Your Sanctuary Portal.
        </Text>
        <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.muted, marginBottom: 20 }}>
          Complete your ID verification or apply for an upcoming 30-day sanctuary stay.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.borderColor, marginBottom: 24 }}
          contentContainerStyle={{ gap: 6, paddingBottom: 8 }}
        >
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <Pressable
                key={t.id}
                onPress={() => setActive(t.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: on ? colors.green : 'transparent',
                }}
              >
                <Ionicons name={t.icon} size={16} color={on ? '#FFFFFF' : colors.body} />
                <Text style={{ fontFamily: on ? fonts.sansBold : fonts.sansMedium, fontSize: 13, color: on ? '#FFFFFF' : colors.body }}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Card style={{ padding: 24, gap: 12 }}>
          <Ionicons name={current.icon} size={26} color={colors.water} />
          <Text style={{ fontFamily: fonts.serifMedium, fontSize: 24, color: colors.heading }}>{current.label}</Text>
          <Body>
            {active === 'home'
              ? 'No active application yet. Apply for a 30-day sanctuary to begin your journey.'
              : 'This section will be built out to match the web portal next.'}
          </Body>
          {active === 'home' && <Button label="Apply for a Month" icon="arrow-forward" onPress={() => router.navigate('/apply')} />}
        </Card>
      </View>
    </Screen>
  );
}
