import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { initialProperties } from '../src/data/mockData';
import { colors, fonts } from '../src/theme';

const demoAgencyNumber = '0797796560';
const activeSanctuary = initialProperties.find((property) => property.id === 'prop-002') ?? initialProperties[0];

const emergencyContacts = [
  {
    id: 'agency',
    title: 'Gap Month Agency',
    subtitle: 'Demo care line · user-provided number',
    phone: demoAgencyNumber,
    numberLabel: demoAgencyNumber,
    icon: 'heart-outline' as const,
    isUrgent: false,
  },
  {
    id: 'sanctuary',
    title: 'Active sanctuary care',
    subtitle: `${activeSanctuary.title} · ${activeSanctuary.ownerName}`,
    phone: activeSanctuary.ownerPhone,
    numberLabel: activeSanctuary.ownerPhone,
    icon: 'home-outline' as const,
    isUrgent: false,
  },
  {
    id: 'police',
    title: 'SAPS Police',
    subtitle: 'South African Police Service',
    phone: '10111',
    numberLabel: '10111',
    icon: 'shield-outline' as const,
    isUrgent: true,
  },
  {
    id: 'mobile-emergency',
    title: 'Emergency from a mobile phone',
    subtitle: 'South Africa emergency number',
    phone: '112',
    numberLabel: '112',
    icon: 'call-outline' as const,
    isUrgent: true,
  },
];

export default function EmergencyScreen() {
  const router = useRouter();
  const [callError, setCallError] = useState('');

  const callNumber = async (phone: string) => {
    setCallError('');
    try {
      await Linking.openURL(`tel:${phone.replace(/[\s()-]/g, '')}`);
    } catch {
      setCallError('Your device could not open the phone dialer. Please call the number directly.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
          <Text style={styles.headerTitle}>Emergency care line</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.alertBanner}>
            <View style={styles.alertIcon}>
              <Ionicons name="warning" size={22} color="#9B1C1C" />
            </View>
            <View style={styles.alertCopy}>
              <Text style={styles.alertTitle}>Need urgent help?</Text>
              <Text style={styles.alertText}>Choose a contact below. A call button opens your phone dialer to confirm the call.</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Call for support</Text>
          <View style={styles.contactList}>
            {emergencyContacts.map((contact) => (
              <View key={contact.id} style={[styles.contactCard, contact.isUrgent && styles.urgentContactCard]}>
                <View style={[styles.contactIcon, contact.isUrgent && styles.urgentContactIcon]}>
                  <Ionicons name={contact.icon} size={21} color={contact.isUrgent ? '#9B1C1C' : colors.primaryDark} />
                </View>
                <View style={styles.contactCopy}>
                  <Text style={styles.contactTitle}>{contact.title}</Text>
                  <Text style={styles.contactSubtitle}>{contact.subtitle}</Text>
                  <Text style={styles.contactNumber}>{contact.numberLabel}</Text>
                </View>
                <Pressable
                  style={[styles.callButton, contact.isUrgent && styles.urgentCallButton]}
                  accessibilityRole="button"
                  accessibilityLabel={`Call ${contact.title} at ${contact.numberLabel}`}
                  onPress={() => callNumber(contact.phone)}
                >
                  <Ionicons name="call" size={17} color="#FFFFFF" />
                  <Text style={styles.callButtonText}>Call</Text>
                </Pressable>
              </View>
            ))}
          </View>

          {callError ? <Text style={styles.callError}>{callError}</Text> : null}
          <Text style={styles.demoNote}>Agency and sanctuary contacts shown here are demo details until connected to verified care lines.</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 18 },
  header: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: colors.sage },
  headerTitle: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.text },
  headerSpacer: { width: 40 },
  content: { paddingTop: 18, paddingBottom: 28 },
  alertBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, marginBottom: 22, borderRadius: 16, borderWidth: 1, borderColor: '#E8A6A1', backgroundColor: '#FCE8E7' },
  alertIcon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#FFFFFF' },
  alertCopy: { flex: 1, gap: 4 },
  alertTitle: { fontFamily: fonts.sansBold, fontSize: 14, color: '#7F1717' },
  alertText: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 16, color: '#7C3936' },
  sectionTitle: { fontFamily: fonts.sansBold, fontSize: 17, color: colors.text, marginBottom: 11 },
  contactList: { gap: 10 },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  urgentContactCard: { borderColor: '#E8A6A1' },
  contactIcon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: colors.sage },
  urgentContactIcon: { backgroundColor: '#FCE8E7' },
  contactCopy: { flex: 1, gap: 3 },
  contactTitle: { fontFamily: fonts.sansSemi, fontSize: 12, lineHeight: 16, color: colors.text },
  contactSubtitle: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 14, color: colors.textSecondary },
  contactNumber: { fontFamily: fonts.sansBold, fontSize: 13, color: colors.primaryDark, marginTop: 1 },
  callButton: { minWidth: 61, minHeight: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: 9, borderRadius: 12, backgroundColor: colors.primaryDark },
  urgentCallButton: { backgroundColor: '#9B1C1C' },
  callButtonText: { fontFamily: fonts.sansSemi, fontSize: 11, color: '#FFFFFF' },
  callError: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 17, color: '#9B1C1C', marginTop: 12 },
  demoNote: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 15, color: colors.textSecondary, textAlign: 'center', marginTop: 16 },
});