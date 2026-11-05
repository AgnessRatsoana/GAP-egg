import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  defaultProfileSettings,
  loadProfileSettings,
  ProfileSettings,
  saveProfileSettings,
} from '../src/data/profileSettings';
import { colors, fonts } from '../src/theme';

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileSettings>(defaultProfileSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    loadProfileSettings()
      .then((settings) => {
        if (isMounted) setProfile(settings);
      })
      .catch(() => {
        if (isMounted) setMessage('Could not load saved profile details.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const chooseProfilePhoto = async () => {
    setMessage('');
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setMessage('Allow photo library access to choose a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setProfile((current) => ({ ...current, photoUri: result.assets[0].uri }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      await saveProfileSettings(profile);
      setMessage('Your profile has been saved on this device.');
    } catch {
      setMessage('Could not save your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof ProfileSettings, value: string | boolean | null) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>ACCOUNT</Text>
            <Text style={styles.pageTitle}>Profile & Settings</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.photoSection}>
            <View style={styles.photoFrame}>
              {profile.photoUri ? (
                <Image source={{ uri: profile.photoUri }} style={styles.profilePhoto} contentFit="cover" />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoInitial}>{profile.name.trim().charAt(0).toUpperCase() || 'A'}</Text>
                </View>
              )}
              <Pressable
                style={styles.photoEditButton}
                accessibilityRole="button"
                accessibilityLabel="Choose profile photo"
                onPress={chooseProfilePhoto}
              >
                <Ionicons name="camera" size={17} color="#FFFFFF" />
              </Pressable>
            </View>
            <Text style={styles.photoName}>{profile.name || 'Your name'}</Text>
            <Pressable style={styles.changePhotoButton} accessibilityRole="button" onPress={chooseProfilePhoto}>
              <Text style={styles.changePhotoText}>Add or change photo</Text>
            </Pressable>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Personal details</Text>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Full name</Text>
              <TextInput
                value={profile.name}
                onChangeText={(value) => updateField('name', value)}
                placeholder="Your name"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                editable={!isLoading}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                value={profile.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="you@example.com"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Phone number</Text>
              <TextInput
                value={profile.phone}
                onChangeText={(value) => updateField('phone', value)}
                placeholder="Add a phone number"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                keyboardType="phone-pad"
                editable={!isLoading}
              />
            </View>
          </View>

          <View style={styles.settingsRow}>
            <View style={styles.settingsCopy}>
              <Text style={styles.settingsTitle}>Notifications</Text>
              <Text style={styles.settingsDescription}>Receive updates about your stay and support.</Text>
            </View>
            <Pressable
              style={[styles.switchTrack, profile.notificationsEnabled && styles.switchTrackActive]}
              accessibilityRole="switch"
              accessibilityLabel="Enable notifications"
              accessibilityState={{ checked: profile.notificationsEnabled }}
              onPress={() => updateField('notificationsEnabled', !profile.notificationsEnabled)}
            >
              <View style={[styles.switchThumb, profile.notificationsEnabled && styles.switchThumbActive]} />
            </Pressable>
          </View>

          <Pressable
            style={[styles.saveButton, (isLoading || isSaving) && styles.saveButtonDisabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: isLoading || isSaving }}
            onPress={handleSave}
            disabled={isLoading || isSaving}
          >
            <Text style={styles.saveButtonText}>{isSaving ? 'Saving…' : 'Save changes'}</Text>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </Pressable>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, paddingHorizontal: 20, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 8, paddingBottom: 8 },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  headerCopy: { gap: 2 },
  eyebrow: { fontFamily: fonts.sansSemi, fontSize: 9, color: colors.secondaryGreen },
  pageTitle: { fontFamily: fonts.sansBold, fontSize: 21, color: colors.text },
  content: { paddingBottom: 30 },
  photoSection: { alignItems: 'center', paddingVertical: 20, marginBottom: 12, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  photoFrame: { position: 'relative', width: 100, height: 100, marginBottom: 10 },
  profilePhoto: { width: '100%', height: '100%', borderRadius: 50, backgroundColor: colors.sage },
  photoPlaceholder: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: colors.sage },
  photoInitial: { fontFamily: fonts.sansBold, fontSize: 36, color: colors.primaryDark },
  photoEditButton: { position: 'absolute', right: 0, bottom: 0, width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: colors.primaryDark, borderWidth: 2, borderColor: colors.card },
  photoName: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.text, marginBottom: 5 },
  changePhotoButton: { paddingVertical: 4, paddingHorizontal: 10 },
  changePhotoText: { fontFamily: fonts.sansSemi, fontSize: 12, color: colors.secondaryGreen },
  formSection: { padding: 16, marginBottom: 12, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  sectionTitle: { fontFamily: fonts.sansBold, fontSize: 16, color: colors.text, marginBottom: 14 },
  fieldGroup: { marginBottom: 13 },
  fieldLabel: { fontFamily: fonts.sansSemi, fontSize: 12, color: colors.text, marginBottom: 6 },
  input: { minHeight: 46, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, fontFamily: fonts.sans, fontSize: 13, color: colors.text },
  settingsRow: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 15, marginBottom: 16, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  settingsCopy: { flex: 1, gap: 4 },
  settingsTitle: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text },
  settingsDescription: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 16, color: colors.textSecondary },
  switchTrack: { width: 48, height: 28, justifyContent: 'center', paddingHorizontal: 3, borderRadius: 14, backgroundColor: '#D6DCD5' },
  switchTrackActive: { backgroundColor: colors.primaryDark },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF' },
  switchThumbActive: { alignSelf: 'flex-end' },
  saveButton: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: 15, backgroundColor: colors.primaryDark },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { fontFamily: fonts.sansSemi, fontSize: 14, color: '#FFFFFF' },
  message: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 17, color: colors.secondaryGreen, textAlign: 'center', marginTop: 12 },
});
