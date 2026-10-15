import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Button, Card, Eyebrow, SerifTitle } from '../src/components/ui';
import { colors, fonts } from '../src/theme';

export default function AuthScreen() {
  const router = useRouter();
  return (
    <Screen footer={false}>
      <View style={{ padding: 20, paddingTop: 44 }}>
        <Eyebrow style={{ marginBottom: 14 }}>Welcome back</Eyebrow>
        <SerifTitle size={32} style={{ marginBottom: 14 }}>Sign In</SerifTitle>
        <Body style={{ textAlign: 'center', marginBottom: 28 }}>
          Secure sign-in is not connected yet. You can preview the beneficiary portal below.
        </Body>
        <Card style={{ padding: 24, gap: 14 }}>
          <Text style={{ fontFamily: fonts.serifMedium, fontSize: 22, color: colors.heading }}>Your sanctuary portal</Text>
          <Button label="Preview Portal" icon="arrow-forward" onPress={() => router.navigate('/portal')} />
        </Card>
      </View>
    </Screen>
  );
}
