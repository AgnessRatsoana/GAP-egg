import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Button, Card, Eyebrow, SerifTitle } from '../src/components/ui';
import { colors, fonts } from '../src/theme';

export default function OfferHomeScreen() {
  const router = useRouter();
  return (
    <Screen>
      <View style={{ padding: 20, paddingTop: 44, paddingBottom: 56 }}>
        <Eyebrow style={{ marginBottom: 14 }}>For generous hosts</Eyebrow>
        <SerifTitle size={32} style={{ marginBottom: 14 }}>Offer a Sanctuary Haven</SerifTitle>
        <Body style={{ textAlign: 'center', marginBottom: 28 }}>
          Open a quiet, private home to someone who needs a season of rest. Every haven is inspected for safety, privacy, and peace.
        </Body>
        <Card style={{ padding: 24, gap: 10 }}>
          <Text style={{ fontFamily: fonts.serifMedium, fontSize: 22, color: colors.heading }}>Host submission</Text>
          <Body>The full host listing form is coming to the mobile app soon.</Body>
        </Card>
        <View style={{ marginTop: 24 }}>
          <Button label="View Our Sanctuaries" variant="outline" onPress={() => router.navigate('/sanctuaries')} />
        </View>
      </View>
    </Screen>
  );
}
