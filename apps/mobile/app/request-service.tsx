import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supportProfessionals } from '../src/data/supportProfessionals';
import { colors, fonts } from '../src/theme';

export default function RequestServiceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ professionalId?: string; customService?: string }>();
  const professional = supportProfessionals.find((item) => item.id === params.professionalId);
  const customService = typeof params.customService === 'string' ? params.customService : '';
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const serviceName = customService || professional?.specialty || 'Support service';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
          <Text style={styles.headerTitle}>Request support</Text>
          <View style={styles.headerSpacer} />
        </View>

        {isSubmitted ? (
          <View style={styles.confirmation}>
            <View style={styles.confirmationIcon}>
              <Ionicons name="checkmark" size={30} color={colors.primaryDark} />
            </View>
            <Text style={styles.confirmationTitle}>Request prepared</Text>
            <Text style={styles.confirmationText}>
              Your mock request for {serviceName} is ready. A connected backend will be needed to send it to the care team.
            </Text>
            <Pressable style={styles.doneButton} accessibilityRole="button" onPress={() => router.navigate('/support')}>
              <Text style={styles.doneButtonText}>Back to support</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
            <Text style={styles.pageTitle}>Request a service</Text>
            <Text style={styles.description}>Share a few details so your care team can coordinate the right support.</Text>

            <View style={styles.selectedService}>
              <Ionicons name={professional ? 'person-circle-outline' : 'sparkles-outline'} size={22} color={colors.primaryDark} />
              <View style={styles.selectedCopy}>
                <Text style={styles.fieldLabel}>SERVICE</Text>
                <Text style={styles.selectedName}>{serviceName}</Text>
                {professional && <Text style={styles.providerName}>{professional.name}</Text>}
              </View>
            </View>

            <Text style={styles.inputLabel}>Preferred date</Text>
            <TextInput
              value={preferredDate}
              onChangeText={setPreferredDate}
              placeholder="e.g. 18 Nov 2026"
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Preferred time</Text>
            <TextInput
              value={preferredTime}
              onChangeText={setPreferredTime}
              placeholder="e.g. Morning"
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Anything you would like us to know?</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add a note for the care team"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, styles.notesInput]}
              multiline
              textAlignVertical="top"
            />

            <Pressable style={styles.submitButton} accessibilityRole="button" onPress={() => setIsSubmitted(true)}>
              <Text style={styles.submitButtonText}>Submit request</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.mockNote}>Demo only. This request is not sent or stored yet.</Text>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 12 },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  headerTitle: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.text },
  headerSpacer: { width: 42 },
  formContent: { paddingTop: 12, paddingBottom: 26 },
  pageTitle: { fontFamily: fonts.sansBold, fontSize: 25, color: colors.text, marginBottom: 7 },
  description: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSecondary, marginBottom: 22 },
  selectedService: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, marginBottom: 22, borderRadius: 16, backgroundColor: colors.sage },
  selectedCopy: { flex: 1, gap: 3 },
  fieldLabel: { fontFamily: fonts.sansSemi, fontSize: 9, color: colors.secondaryGreen },
  selectedName: { fontFamily: fonts.sansSemi, fontSize: 14, color: colors.text },
  providerName: { fontFamily: fonts.sans, fontSize: 11, color: colors.textSecondary },
  inputLabel: { fontFamily: fonts.sansSemi, fontSize: 12, color: colors.text, marginBottom: 7 },
  input: { minHeight: 48, paddingHorizontal: 13, marginBottom: 18, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, fontFamily: fonts.sans, fontSize: 13, color: colors.text },
  notesInput: { minHeight: 112, paddingTop: 12 },
  submitButton: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 4, borderRadius: 16, backgroundColor: colors.primaryDark },
  submitButtonText: { fontFamily: fonts.sansSemi, fontSize: 15, color: '#FFFFFF' },
  mockNote: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 15, color: colors.textSecondary, textAlign: 'center', marginTop: 12 },
  confirmation: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  confirmationIcon: { width: 62, height: 62, alignItems: 'center', justifyContent: 'center', borderRadius: 31, backgroundColor: colors.sage, marginBottom: 18 },
  confirmationTitle: { fontFamily: fonts.sansBold, fontSize: 22, color: colors.text, marginBottom: 8 },
  confirmationText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, textAlign: 'center', color: colors.textSecondary, marginBottom: 22 },
  doneButton: { minHeight: 48, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: colors.primaryDark },
  doneButtonText: { fontFamily: fonts.sansSemi, fontSize: 14, color: '#FFFFFF' },
});