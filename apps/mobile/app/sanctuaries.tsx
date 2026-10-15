import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Screen } from '../src/components/Chrome';
import { Body, Card, Eyebrow, SerifTitle } from '../src/components/ui';
import { initialProperties } from '../src/data/mockData';
import { colors, fonts } from '../src/theme';

const provinces = ['All', ...Array.from(new Set(initialProperties.map((p) => p.province)))];

export default function SanctuariesScreen() {
  const [province, setProvince] = useState('All');
  const list = initialProperties.filter((p) => province === 'All' || p.province === province);

  return (
    <Screen>
      <View style={{ padding: 20, paddingTop: 44, paddingBottom: 56 }}>
        <Eyebrow style={{ marginBottom: 14 }}>Vetted havens across South Africa</Eyebrow>
        <SerifTitle size={32} style={{ marginBottom: 14 }}>Our Sanctuaries</SerifTitle>
        <Body style={{ textAlign: 'center', marginBottom: 24 }}>
          Every haven is inspected for privacy, safety, and acoustic peace before it joins our network.
        </Body>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 20 }}>
          {provinces.map((p) => {
            const active = p === province;
            return (
              <Pressable
                key={p}
                onPress={() => setProvince(p)}
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 16,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: active ? colors.green : colors.borderColor,
                  backgroundColor: active ? colors.green : '#FFFFFF',
                }}
              >
                <Text style={{ fontFamily: fonts.sansSemi, fontSize: 12, color: active ? '#FFFFFF' : colors.body }}>{p}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ gap: 24 }}>
          {list.map((p) => (
            <Card key={p.id}>
              <Image source={{ uri: p.photos[0] }} style={{ height: 240 }} contentFit="cover" />
              <View style={{ padding: 18, gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <Text style={{ flex: 1, fontFamily: fonts.serifMedium, fontSize: 22, color: colors.heading }}>{p.title}</Text>
                  <Text style={{ fontFamily: fonts.sansSemi, fontSize: 13, color: colors.heading }}>★ {p.rating}</Text>
                </View>
                <Text style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.muted }}>{p.city}</Text>
                <Text numberOfLines={3} style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.body }}>
                  {p.description}
                </Text>
                <Text style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.muted }}>
                  {p.bedrooms} bedrooms • {p.bathrooms} bathrooms • up to {p.maxGuests} guests
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </Screen>
  );
}
