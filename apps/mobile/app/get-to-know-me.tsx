import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../src/theme';

const preferenceSections = [
  {
    id: 'food',
    title: 'Food & drinks',
    icon: 'restaurant-outline',
    description: 'Meals, dietary needs, snacks, and drinks.',
    fields: [
      { id: 'favouriteMeals', label: 'Favourite meals', placeholder: 'What meals do you enjoy?' },
      { id: 'dietaryNeeds', label: 'Dietary needs', placeholder: 'Allergies, preferences, or dietary requirements' },
      { id: 'favouriteSnacks', label: 'Snacks & drinks', placeholder: 'Favourite snacks, drinks, or comfort foods' },
    ],
  },
  {
    id: 'entertainment',
    title: 'Music & entertainment',
    icon: 'musical-notes-outline',
    description: 'Artists, films, phone, games, and ways you like to unwind.',
    fields: [
      { id: 'artists', label: 'Artists & music', placeholder: 'Artists, songs, or sounds you love' },
      { id: 'films', label: 'Films & series', placeholder: 'Films or series you enjoy' },
      { id: 'gamesAndPhone', label: 'Games & phone', placeholder: 'Games, apps, or devices you like to use' },
    ],
  },
  {
    id: 'hobbies',
    title: 'Hobbies & activities',
    icon: 'color-palette-outline',
    description: 'The things you enjoy, love doing, or would like to try.',
    fields: [
      { id: 'hobbies', label: 'Things you enjoy', placeholder: 'Tell us about your favourite hobbies and activities' },
      { id: 'trySomething', label: 'Something new', placeholder: 'Is there something you would like to try?' },
    ],
  },
  {
    id: 'personal-care',
    title: 'Personal care',
    icon: 'sparkles-outline',
    description: 'Skincare, haircare, routines, and comfort items.',
    fields: [
      { id: 'skincare', label: 'Skincare', placeholder: 'Products, routines, or sensitivities' },
      { id: 'haircare', label: 'Haircare', placeholder: 'Haircare needs or preferred products' },
      { id: 'comfortItems', label: 'Comfort items', placeholder: 'Items that help you feel comfortable' },
    ],
  },
  {
    id: 'books-more',
    title: 'Books & more',
    icon: 'book-outline',
    description: 'Books, clothing, gadgets, and other personal preferences.',
    fields: [
      { id: 'books', label: 'Books & reading', placeholder: 'Favourite books, authors, or genres' },
      { id: 'clothing', label: 'Clothing', placeholder: 'Clothing preferences or useful sizes' },
      { id: 'gadgets', label: 'Gadgets & other', placeholder: 'Gadgets or other things that make your stay easier' },
    ],
  },
  {
    id: 'avoid',
    title: 'What to avoid',
    icon: 'alert-circle-outline',
    description: 'Activities, items, or situations you would prefer to avoid.',
    fields: [
      { id: 'avoidActivities', label: 'Activities to avoid', placeholder: 'Activities you would rather not take part in' },
      { id: 'avoidItems', label: 'Items or sensitivities', placeholder: 'Items, scents, foods, or other things to avoid' },
    ],
  },
] as const;

type PreferenceSectionId = (typeof preferenceSections)[number]['id'];
type PreferenceSection = (typeof preferenceSections)[number];

const preferenceStorageKey = '@gap-month/get-to-know-me';

function getAnsweredCount(section: PreferenceSection, answers: Record<string, string>) {
  return section.fields.filter((field) => Boolean(answers[field.id]?.trim())).length;
}

export default function GetToKnowMeScreen() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<PreferenceSectionId | null>(null);
  const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>({});
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState(false);
  const currentSection = activeSection
    ? preferenceSections.find((section) => section.id === activeSection)
    : undefined;

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(preferenceStorageKey)
      .then((storedAnswers) => {
        if (!isMounted || !storedAnswers) return;
        const parsedAnswers = JSON.parse(storedAnswers) as Record<string, unknown>;
        const validAnswers = Object.fromEntries(
          Object.entries(parsedAnswers).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
        );
        setSavedAnswers(validAnswers);
        setDraftAnswers(validAnswers);
      })
      .catch(() => {
        if (isMounted) setSaveError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openSection = (section: PreferenceSection) => {
    const hasSavedResponses = getAnsweredCount(section, savedAnswers) > 0;
    setDraftAnswers(savedAnswers);
    setActiveSection(section.id);
    setIsEditing(!hasSavedResponses);
    setSaveError(false);
  };

  const saveSection = async () => {
    if (!activeSection) return;

    try {
      await AsyncStorage.setItem(preferenceStorageKey, JSON.stringify(draftAnswers));
      setSavedAnswers(draftAnswers);
      setIsEditing(false);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.backRow}>
          <Pressable style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>YOUR PREFERENCES</Text>
          <Text style={styles.pageTitle}>Get to Know Me</Text>
          <Text style={styles.intro}>
            Help us create a more personalised and comfortable experience for you.
          </Text>
        </View>

        <ScrollView style={styles.sectionList} contentContainerStyle={styles.sectionListContent} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading your preferences…</Text>
          ) : (
            preferenceSections.map((section) => {
              const answerCount = getAnsweredCount(section, savedAnswers);
              return (
                <Pressable
                  key={section.id}
                  style={styles.sectionTab}
                  accessibilityRole="button"
                  onPress={() => openSection(section)}
                >
                  <View style={styles.sectionIcon}>
                    <Ionicons name={section.icon} size={20} color={colors.primaryDark} />
                  </View>
                  <View style={styles.sectionTabCopy}>
                    <Text style={styles.sectionTabText}>{section.title}</Text>
                    <Text numberOfLines={2} style={styles.sectionTabDescription}>
                      {answerCount > 0 ? `${answerCount} responses saved on this device` : section.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.secondaryGreen} />
                </Pressable>
              );
            })
          )}
        </ScrollView>
      </View>

      <Modal
        visible={currentSection !== undefined}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setActiveSection(null)}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          {currentSection && activeSection && (
            <>
              <View style={styles.formHeader}>
                <Pressable
                  style={styles.formBackButton}
                  accessibilityRole="button"
                  accessibilityLabel="Back to preferences"
                  onPress={() => {
                    setActiveSection(null);
                    setSaveError(false);
                  }}
                >
                  <Ionicons name="chevron-back" size={21} color={colors.primaryDark} />
                </Pressable>
                <Text style={styles.formHeaderTitle}>{currentSection.title}</Text>
                {getAnsweredCount(currentSection, savedAnswers) > 0 && !isEditing ? (
                  <Pressable
                    style={styles.editButton}
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${currentSection.title}`}
                    onPress={() => {
                      setDraftAnswers(savedAnswers);
                      setIsEditing(true);
                      setSaveError(false);
                    }}
                  >
                    <Ionicons name="pencil" size={18} color={colors.primaryDark} />
                  </Pressable>
                ) : (
                  <View style={styles.formHeaderSpacer} />
                )}
              </View>

              <ScrollView
                key={currentSection.id}
                style={styles.formScroll}
                contentContainerStyle={styles.formContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.formTitle}>{currentSection.title}</Text>
                <Text style={styles.formDescription}>{currentSection.description}</Text>

                {isEditing ? (
                  <>
                    {currentSection.fields.map((field) => (
                      <View key={field.id} style={styles.fieldGroup}>
                        <Text style={styles.fieldLabel}>{field.label}</Text>
                        <TextInput
                          value={draftAnswers[field.id] ?? ''}
                          onChangeText={(value) => {
                            setDraftAnswers((current) => ({ ...current, [field.id]: value }));
                            setSaveError(false);
                          }}
                          placeholder={field.placeholder}
                          placeholderTextColor={colors.textSecondary}
                          style={styles.fieldInput}
                          multiline
                          textAlignVertical="top"
                          accessibilityLabel={field.label}
                        />
                      </View>
                    ))}

                    <Pressable style={styles.saveButton} accessibilityRole="button" onPress={saveSection}>
                      <Text style={styles.saveButtonText}>Save {currentSection.title.toLowerCase()}</Text>
                      <Ionicons name="checkmark" size={17} color="#FFFFFF" />
                    </Pressable>
                    {saveError && <Text style={styles.errorMessage}>Couldn&apos;t save right now. Please try again.</Text>}
                  </>
                ) : (
                  <View style={styles.responseList}>
                    {currentSection.fields
                      .filter((field) => Boolean(savedAnswers[field.id]?.trim()))
                      .map((field) => (
                        <View key={field.id} style={styles.responseItem}>
                          <Text style={styles.fieldLabel}>{field.label}</Text>
                          <Text style={styles.responseText}>{savedAnswers[field.id]}</Text>
                        </View>
                      ))}
                    <Text style={styles.savedMessage}>Saved on this device.</Text>
                  </View>
                )}
              </ScrollView>
            </>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, paddingHorizontal: 18, backgroundColor: colors.background },
  backRow: { alignItems: 'flex-start', paddingTop: 8 },
  backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  titleBlock: { gap: 4, paddingTop: 18, marginBottom: 14 },
  eyebrow: { fontFamily: fonts.sansSemi, fontSize: 9, color: colors.secondaryGreen },
  pageTitle: { fontFamily: fonts.sansBold, fontSize: 21, color: colors.text },
  intro: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginTop: 5 },
  sectionList: { flex: 1 },
  sectionListContent: { gap: 10, paddingBottom: 20 },
  sectionTab: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  sectionIcon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: colors.sage },
  sectionTabCopy: { flex: 1, gap: 4 },
  sectionTabText: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text },
  sectionTabDescription: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 14, color: colors.textSecondary },
  loadingText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textSecondary, paddingVertical: 16 },
  modalSafeArea: { flex: 1, backgroundColor: colors.background },
  formHeader: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  formBackButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: colors.sage },
  formHeaderTitle: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.text },
  formHeaderSpacer: { width: 40 },
  editButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: colors.sage },
  formScroll: { flex: 1 },
  formContent: { padding: 22, paddingBottom: 36 },
  formTitle: { fontFamily: fonts.sansBold, fontSize: 22, lineHeight: 28, color: colors.text, marginBottom: 6 },
  formDescription: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginBottom: 24 },
  fieldGroup: { marginBottom: 18 },
  fieldLabel: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text, marginBottom: 8 },
  fieldInput: { minHeight: 92, paddingHorizontal: 13, paddingTop: 12, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.text },
  saveButton: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 12, borderRadius: 15, backgroundColor: colors.primaryDark, marginTop: 4 },
  saveButtonText: { fontFamily: fonts.sansSemi, fontSize: 14, color: '#FFFFFF' },
  savedMessage: { fontFamily: fonts.sans, fontSize: 12, textAlign: 'center', color: colors.secondaryGreen, marginTop: 16 },
  responseList: { gap: 16 },
  responseItem: { gap: 7, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  responseText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.text },
  errorMessage: { fontFamily: fonts.sans, fontSize: 12, textAlign: 'center', color: '#9B2C32', marginTop: 12 },
});