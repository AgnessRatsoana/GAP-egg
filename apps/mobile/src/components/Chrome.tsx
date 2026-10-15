import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';
import { Logo } from './Logo';
import { Button } from './ui';

const links = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/sanctuaries', label: 'Sanctuaries' },
  { href: '/offer-home', label: 'Offer Your Home' },
  { href: '/apply', label: 'Apply' },
] as const;

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    router.navigate(href as never);
  };

  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        paddingBottom: 10,
        paddingHorizontal: 18,
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable onPress={() => go('/')}>
        <Logo size="sm" showTagline={false} />
      </Pressable>
      <Pressable onPress={() => setOpen(true)} hitSlop={12}>
        <Ionicons name="menu" size={26} color={colors.heading} />
      </Pressable>

      <Modal visible={open} animationType="fade" transparent onRequestClose={() => setOpen(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgPage }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 }}>
            <Logo size="sm" showTagline={false} />
            <Pressable onPress={() => setOpen(false)} hitSlop={12}>
              <Ionicons name="close" size={26} color={colors.heading} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ padding: 24, gap: 4 }}>
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Pressable
                  key={l.href}
                  onPress={() => go(l.href)}
                  style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.borderColor }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.serif,
                      fontSize: 24,
                      color: active ? colors.green : colors.heading,
                      letterSpacing: 0.8,
                    }}
                  >
                    {l.label}
                  </Text>
                </Pressable>
              );
            })}
            <View style={{ marginTop: 28, gap: 12 }}>
              <Button label="My Sanctuary Portal" icon="arrow-forward" onPress={() => go('/portal')} />
              <Button label="Sign In" variant="outline" onPress={() => go('/auth')} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

export function Footer() {
  const router = useRouter();
  const items = [
    ['How It Works (7-Step Journey)', '/how-it-works'],
    ['Our Vetted Sanctuaries', '/sanctuaries'],
    ['Apply for a Month', '/apply'],
    ['Offer Your Home', '/offer-home'],
  ] as const;
  return (
    <View style={{ backgroundColor: colors.footer, padding: 28, paddingBottom: 40, gap: 24 }}>
      <Logo size="sm" titleColor="#FFFFFF" taglineColor="#E5C39E" />
      <Text style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: '#DCE5DF' }}>
        Your Gap Month is a season to return to yourself. Providing adults navigating critical life transitions with 30
        days of tranquil haven accommodation and professional wellbeing care.
      </Text>
      <View style={{ gap: 12 }}>
        <Text style={{ fontFamily: fonts.sansSemi, fontSize: 11, letterSpacing: 2, color: '#FFFFFF' }}>PROGRAMME</Text>
        {items.map(([label, href]) => (
          <Pressable key={href} onPress={() => router.navigate(href as never)}>
            <Text style={{ fontFamily: fonts.sans, fontSize: 14, color: '#DCE5DF' }}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={{ fontFamily: fonts.sans, fontSize: 11, color: '#8FA597', borderTopWidth: 1, borderTopColor: '#2B3D32', paddingTop: 16 }}>
        Compassionate Sanctuary Network • Complete Privacy Guaranteed
      </Text>
    </View>
  );
}

export function Screen({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPage }}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children}
        {footer && <Footer />}
      </ScrollView>
    </View>
  );
}
