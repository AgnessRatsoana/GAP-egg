import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Button, Card, Eyebrow, SerifTitle } from '../src/components/ui';
import { colors, fonts } from '../src/theme';

const steps = [
  { step: '01', title: 'Confidential Application', desc: 'Complete our gentle, confidential application. There is zero invasive paperwork or red tape — tell us what you feel comfortable sharing about your current circumstances, health needs, and ideal sanctuary location.', timeframe: 'Takes ~8 minutes' },
  { step: '02', title: 'Compassionate Verification & Care Call', desc: 'Our intake coordinator has a warm, unhurried conversation with you by phone. We verify eligibility with complete empathy and discretion, ensuring your personal dignity and privacy are strictly safeguarded.', timeframe: 'Within 24–48 hours' },
  { step: '03', title: 'Clinical & Wellbeing Planning', desc: 'Together with a chartered psychologist or senior restorative care lead, we design your month: quiet restorative convalescence, weekly trauma counselling, somatic nervous system reset, or mindful life realignment.', timeframe: 'Gentle 1-on-1 alignment' },
  { step: '04', title: 'Sanctuary Haven Matching', desc: 'We match you with a thoroughly inspected, peaceful private residence from our vetted network — a rural Cape Winelands cottage, indigenous Tsitsikamma forest cabin, or quiet coastal haven in South Africa with complete privacy.', timeframe: 'Personalised to your safety' },
  { step: '05', title: 'Bespoke Haven Pre-Stocking', desc: 'Prior to your arrival, our team prepares your sanctuary based on your "Get to Know Me" reflections: your favourite comforting meals, organic pantry staples, herbal teas, favourite books, warm throws, and gentle music.', timeframe: 'Ready upon arrival' },
  { step: '06', title: 'Rest, Recovery & Professional Care', desc: 'Your 30 days are yours. There are no expectations or obligations. You receive weekly fully funded clinical therapy sessions, an optional daily reflection journal, and on-call care coordinators for any pantry or transport needs.', timeframe: 'Full 30-day sanctuary' },
  { step: '07', title: 'Sustainable Transition & 90-Day Care', desc: 'As your month draws to a close, your care manager supports your next steps: personal life realignment, mindful return-to-work pacing, and continuing therapy. We remain beside you with milestone follow-ups at 30, 60, and 90 days.', timeframe: 'Long-term support' },
];

export default function HowItWorksScreen() {
  const router = useRouter();
  return (
    <Screen>
      <View style={{ padding: 20, paddingTop: 44, paddingBottom: 56 }}>
        <Eyebrow style={{ marginBottom: 14 }}>A clear & dignified pathway</Eyebrow>
        <SerifTitle size={34} style={{ marginBottom: 16 }}>How a Gap Month Works</SerifTitle>
        <Body style={{ textAlign: 'center', marginBottom: 36 }}>
          We remove chaos, judgment, and bureaucracy. Here is the unhurried step-by-step journey from your first confidential request to stepping into your fresh start.
        </Body>
        <View style={{ gap: 16 }}>
          {steps.map((s) => (
            <Card key={s.step} style={{ padding: 24, gap: 10 }}>
              <Text style={{ fontFamily: fonts.serifLight, fontSize: 40, color: colors.brown, lineHeight: 44 }}>{s.step}</Text>
              <Text style={{ fontFamily: fonts.serifMedium, fontSize: 23, color: colors.heading }}>{s.title}</Text>
              <Body>{s.desc}</Body>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 10, letterSpacing: 1.6, color: colors.green, textTransform: 'uppercase' }}>
                {s.timeframe}
              </Text>
            </Card>
          ))}
        </View>
        <View style={{ marginTop: 32 }}>
          <Button label="Begin Your Application" icon="arrow-forward" onPress={() => router.navigate('/apply')} />
        </View>
      </View>
    </Screen>
  );
}
