import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Button, Card, Eyebrow, SerifTitle } from '../src/components/ui';
import { colors, fonts } from '../src/theme';

export default function ApplyScreen() {
  const router = useRouter();
  const expect = [
    'A gentle, confidential application — about 8 minutes',
    'A warm intake call within 24–48 hours',
    'Clinical and wellbeing planning tailored to you',
    'Matching with a vetted private sanctuary',
  ];
  return (
    <Screen>
      <View style={{ padding: 20, paddingTop: 44, paddingBottom: 56 }}>
        <Eyebrow style={{ marginBottom: 14 }}>Confidential application</Eyebrow>
        <SerifTitle size={32} style={{ marginBottom: 14 }}>Apply for a Month</SerifTitle>
        <Body style={{ textAlign: 'center', marginBottom: 28 }}>
          Our confidential application takes under 8 minutes. We review every request with complete dignity, non-judgmental care, and discretion.
        </Body>
        <Card style={{ padding: 24, gap: 14 }}>
          <Text style={{ fontFamily: fonts.serifMedium, fontSize: 22, color: colors.heading }}>What to expect</Text>
          {expect.map((e) => (
            <Text key={e} style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.body }}>✓  {e}</Text>
          ))}
          <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.muted }}>
            The full application form is coming to the mobile app soon.
          </Text>
        </Card>
        <View style={{ marginTop: 24 }}>
          <Button label="Learn How It Works" variant="outline" onPress={() => router.navigate('/how-it-works')} />
        </View>
      </View>
    </Screen>
  );
}
