import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Button, Card, Eyebrow, SerifTitle } from '../src/components/ui';
import { initialProperties } from '../src/data/mockData';
import { colors, fonts } from '../src/theme';

const HERO =
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85';

const trust = [
  { icon: 'shield-checkmark-outline', text: '100% Confidential Care', color: '#C6E6CF' },
  { icon: 'checkmark-circle-outline', text: 'Fully Funded Residencies (Zero Cost)', color: '#C6E6CF' },
  { icon: 'heart-outline', text: 'Dedicated HPCSA Care Circles', color: '#ECCDBE' },
  { icon: 'location-outline', text: 'All 9 South African Provinces', color: '#C2DFE8' },
] as const;

const pillars = [
  { num: '01', title: 'Private Safe Haven', desc: 'Self-contained, quiet homes with verified safety locks, private gardens, and no unexpected intrusions.' },
  { num: '02', title: 'Clinical Wellbeing Support', desc: 'Dedicated weekly sessions with chartered trauma, grief, and burnout therapists chosen for your specific needs.' },
  { num: '03', title: 'Pantry & Daily Comforts', desc: 'Pre-stocked pantry matching your dietary needs, comforting tea ceremony, favourite books, and soft linens.' },
  { num: '04', title: 'Life Renewal & Sustained Wellbeing', desc: 'Personal life coaching, holistic mindfulness integration, paced return-to-life roadmap, and scheduled 90-day wellbeing follow-ups.' },
];

const testimonials = [
  { quote: 'Gap a Month literally saved my life. Having 30 days where nobody asked anything of me, where I had nourishing food, safety, and a therapist who believed in me, gave me my future back.', who: 'Maya P. — Bristol', note: 'Caregiver exhaustion recovery • Permanent tenancy established' },
  { quote: 'After my partner passed away, I could not function. The month at Highland Pine gave me space to sleep, walk in clean air, and breathe without judgment. The dignity Gap a Month afforded me is something I will never forget.', who: 'Thomas B. — Edinburgh', note: 'Bereavement recovery • Returned to career' },
];

const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

export default function LandingScreen() {
  const router = useRouter();
  const featured = initialProperties.slice(0, 3);

  return (
    <Screen>
      <View style={{ minHeight: 640, justifyContent: 'center', overflow: 'hidden' }}>
        <Image source={{ uri: HERO }} style={fill} contentFit="cover" />
        <LinearGradient
          colors={['rgba(14,26,20,0.74)', 'rgba(18,34,26,0.50)', 'rgba(14,26,20,0.78)', 'rgba(243,247,250,0.98)', '#F3F7FA']}
          locations={[0, 0.4, 0.8, 0.98, 1]}
          style={fill}
        />
        <View style={{ padding: 24, paddingTop: 48, paddingBottom: 90, alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingVertical: 7,
              paddingHorizontal: 14,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.28)',
              marginBottom: 20,
            }}
          >
            <Ionicons name="sparkles" size={12} color="#E5C39E" />
            <Text style={{ fontFamily: fonts.sansSemi, fontSize: 9, letterSpacing: 1.8, color: '#FAF6F0', textTransform: 'uppercase' }}>
              A Season to Return to Yourself • South Africa
            </Text>
          </View>

          <Text style={{ fontFamily: fonts.serifLight, fontSize: 42, lineHeight: 50, color: '#FFFFFF', textAlign: 'center', letterSpacing: 0.8 }}>
            Peaceful Sanctuaries for{' '}
            <Text style={{ fontFamily: fonts.serifItalic, color: '#F4ECE1' }}>Restoration</Text>
          </Text>

          <Text style={{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: 'rgba(255,255,255,0.94)', textAlign: 'center', marginTop: 20, marginBottom: 32 }}>
            Dignified 30-day temporary residences and dedicated professional wellbeing care across storied South African countryside, coastal shorelines, and peaceful mountain havens.
          </Text>

          <View style={{ alignSelf: 'stretch', gap: 12 }}>
            <Button label="Apply for a 30-Day Sanctuary" icon="arrow-forward" onPress={() => router.navigate('/apply')} />
            <Button label="Offer a Sanctuary Haven" icon="home-outline" variant="glass" onPress={() => router.navigate('/offer-home')} />
            <Pressable onPress={() => router.navigate('/sanctuaries')} style={{ alignItems: 'center', padding: 10 }}>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 12, letterSpacing: 1.4, color: '#FAF6F0', textTransform: 'uppercase' }}>
                Explore All Havens →
              </Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 36, paddingTop: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', alignSelf: 'stretch', gap: 12 }}>
            {trust.map((t) => (
              <View key={t.text} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons name={t.icon} size={15} color={t.color} />
                <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: 'rgba(255,255,255,0.92)' }}>{t.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: 'rgba(235,244,247,0.82)', padding: 28, paddingVertical: 56, borderBottomWidth: 1, borderBottomColor: colors.borderWater, alignItems: 'center' }}>
        <Eyebrow color={colors.brown} style={{ marginBottom: 20 }}>Our ethos of sanctuary & unconditional rest</Eyebrow>
        <Text style={{ fontFamily: fonts.serifItalic, fontSize: 22, lineHeight: 32, color: colors.heading, textAlign: 'center', marginBottom: 24 }}>
          “Since we founded Gap a Month, one truth remains unchanged: your gap month is a season to return to yourself. Quiet spaces of natural beauty, unconditional kindness, and dedicated clinical support can restore what acute hardship wore away.”
        </Text>
        <Text style={{ fontFamily: fonts.sans, fontSize: 11, letterSpacing: 1.6, color: colors.muted, textTransform: 'uppercase', marginBottom: 28, textAlign: 'center' }}>
          — The Gap a Month Philosophy of Sanctuary
        </Text>
        <Button label="How the Month Works" variant="outline" onPress={() => router.navigate('/how-it-works')} />
      </View>

      <View style={{ paddingVertical: 56, paddingHorizontal: 20 }}>
        <SerifTitle size={26} style={{ marginBottom: 10 }}>Popular Sanctuaries in South Africa</SerifTitle>
        <Text style={{ fontFamily: fonts.sans, fontSize: 12, letterSpacing: 1.4, color: colors.muted, textTransform: 'uppercase', textAlign: 'center', marginBottom: 32 }}>
          Vetted for complete privacy, acoustic peace, and compassionate host hospitality.
        </Text>
        <View style={{ gap: 24 }}>
          {featured.map((p) => (
            <Pressable key={p.id} onPress={() => router.navigate('/sanctuaries')}>
              <Card>
                <Image source={{ uri: p.photos[0] }} style={{ height: 260 }} contentFit="cover" />
                <View style={{ padding: 18, gap: 6 }}>
                  <Text style={{ fontFamily: fonts.serifMedium, fontSize: 22, color: colors.heading }}>{p.title}</Text>
                  <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.muted }}>{p.city}</Text>
                  <Text style={{ fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 1.6, color: colors.green, marginTop: 6, textTransform: 'uppercase' }}>
                    View Sanctuary
                  </Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
        <View style={{ alignItems: 'center', marginTop: 28 }}>
          <Button label="View All 48 Vetted Sanctuaries" variant="outline" onPress={() => router.navigate('/sanctuaries')} />
        </View>
      </View>

      <View style={{ backgroundColor: colors.bgWarm, padding: 28, paddingVertical: 56, alignItems: 'center', gap: 16 }}>
        <SerifTitle size={26}>Let us help craft your month of healing</SerifTitle>
        <Body style={{ textAlign: 'center' }}>
          Our Sanctuary Specialists personally visit each haven and oversee every detail. We ensure your month is completely peaceful, pre-stocked with your dietary preferences, and wrapped in discreet professional clinical care.
        </Body>
      </View>

      <View style={{ paddingVertical: 56, paddingHorizontal: 20 }}>
        <Eyebrow style={{ marginBottom: 12 }}>Comprehensive provision</Eyebrow>
        <SerifTitle size={28} style={{ marginBottom: 28 }}>The Four Pillars of Sanctuary</SerifTitle>
        <View style={{ gap: 16 }}>
          {pillars.map((p) => (
            <Card key={p.num} style={{ padding: 24, gap: 8 }}>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 10, letterSpacing: 2, color: colors.brown, textTransform: 'uppercase' }}>Pillar {p.num}</Text>
              <Text style={{ fontFamily: fonts.serifMedium, fontSize: 22, color: colors.heading }}>{p.title}</Text>
              <Body>{p.desc}</Body>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ paddingBottom: 56, paddingHorizontal: 20 }}>
        <SerifTitle size={28} style={{ marginBottom: 28 }}>Reflections of Peace</SerifTitle>
        <View style={{ gap: 16 }}>
          {testimonials.map((t) => (
            <Card key={t.who} style={{ padding: 24, gap: 12 }}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.brown} />
              <Text style={{ fontFamily: fonts.serifItalic, fontSize: 19, lineHeight: 28, color: colors.heading }}>{t.quote}</Text>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 13, color: colors.heading }}>{t.who}</Text>
              <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.muted }}>{t.note}</Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: colors.waterDeep, padding: 28, paddingVertical: 56, alignItems: 'center', gap: 16 }}>
        <SerifTitle size={28} style={{ color: '#FFFFFF' }}>A Safe Space. A Fresh Start.</SerifTitle>
        <Text style={{ fontFamily: fonts.sans, fontSize: 15, lineHeight: 24, color: 'rgba(255,255,255,0.88)', textAlign: 'center' }}>
          Our confidential application takes under 8 minutes. We review every request with complete dignity, non-judgmental care, and discretion.
        </Text>
        <View style={{ alignSelf: 'stretch', gap: 12, marginTop: 8 }}>
          <Button label="Apply for a Month" icon="arrow-forward" onPress={() => router.navigate('/apply')} />
          <Button label="Offer a Haven Home" variant="glass" onPress={() => router.navigate('/offer-home')} />
        </View>
      </View>
    </Screen>
  );
}
