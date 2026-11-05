import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loadProfileSettings } from '../../src/data/profileSettings';
import { initialProperties } from '../../src/data/mockData';
import { getSanctuaryImage } from '../../src/data/sanctuaryImages';
import { supportCategories } from '../../src/data/supportProfessionals';
import { Booking } from '../../src/types';
import { colors, fonts } from '../../src/theme';

const minimumStayNights = 30;
const bookingsStorageKey = '@gap-month/booking-requests';
type DateField = 'arrival' | 'departure';
type StayIntakeBooking = Booking & {
  careCircumstance: string;
  internalSupportNeeds: string[];
  externalSupportNeeds: string[];
};

const careCircumstances = [
  { value: 'Caregiver Burnout & Respite', label: 'Caregiver Burnout & Respite' },
  { value: 'Grief & Bereavement', label: 'Grief & Bereavement' },
  { value: 'Acute Stress & Reset', label: 'Acute Stress & Reset' },
  { value: 'Life & Career Redirection', label: 'Life & Career Redirection' },
  { value: 'Recovery after illness or surgery', label: 'Recovery after illness or surgery' },
  { value: 'Major life transition', label: 'Major life transition' },
  { value: 'Family or relationship change', label: 'Family or relationship change' },
  { value: 'Work-related exhaustion', label: 'Work-related exhaustion' },
  { value: 'other', label: 'Other' },
  { value: 'private', label: 'Private — prefer not to disclose' },
];

const internalSupportOptions = [
  { id: 'laundry', label: 'Laundry', icon: 'shirt-outline' as const },
  { id: 'catering', label: 'Meal preparation & catering', icon: 'restaurant-outline' as const },
  { id: 'groceries', label: 'Grocery and pantry setup', icon: 'basket-outline' as const },
  { id: 'transport', label: 'Transport assistance', icon: 'car-outline' as const },
  { id: 'daily-living', label: 'Daily living support', icon: 'heart-outline' as const },
];

const externalSupportOptions = supportCategories.filter((category) => category.value !== 'all');

function addDays(date: Date, count: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + count);
  return result;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatZar(amount: number) {
  return `R ${amount.toLocaleString('en-ZA')}`;
}

export default function BookingRequestScreen() {
  const router = useRouter();
  const { id, emergency } = useLocalSearchParams<{ id?: string; emergency?: string }>();
  const routeProperty = initialProperties.find((item) => item.id === id) ?? initialProperties[0];
  const [selectedPropertyId, setSelectedPropertyId] = useState(routeProperty.id);
  const property = initialProperties.find((item) => item.id === selectedPropertyId) ?? routeProperty;
  const [arrivalDate, setArrivalDate] = useState(() => addDays(new Date(), 7));
  const [departureDate, setDepartureDate] = useState(() => addDays(new Date(), 7 + minimumStayNights));
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedCircumstance, setSelectedCircumstance] = useState<string | null>(
    emergency === 'true' ? 'emergency-triage' : null
  );
  const [isCircumstanceListOpen, setIsCircumstanceListOpen] = useState(false);
  const [otherCircumstance, setOtherCircumstance] = useState('');
  const [internalSupportNeeds, setInternalSupportNeeds] = useState<string[]>([]);
  const [externalSupportNeeds, setExternalSupportNeeds] = useState<string[]>([]);
  const [datePickerField, setDatePickerField] = useState<DateField | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const stayNights = Math.max(0, Math.ceil((departureDate.getTime() - arrivalDate.getTime()) / 86_400_000));
  const accommodationCost = property.monthlyRate
    ? Math.ceil(stayNights / 30) * property.monthlyRate
    : stayNights * (property.nightlyPrice ?? 0);
  const cleaningFee = property.cleaningFee ?? 0;
  const serviceFee = property.serviceFee ?? 0;
  const estimatedTotal = accommodationCost + cleaningFee + serviceFee;
  const emergencyAvailableProperties = initialProperties.filter((candidate) =>
    candidate.availabilityStart <= formatDateKey(arrivalDate) &&
    candidate.availabilityEnd >= formatDateKey(departureDate)
  );
  const isSelectedEmergencySanctuaryAvailable = emergencyAvailableProperties.some((candidate) => candidate.id === property.id);

  const handleDateChange = (field: DateField, event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setDatePickerField(null);
      return;
    }
    if (!selectedDate) return;

    if (field === 'arrival') {
      setArrivalDate(selectedDate);
      if (departureDate < addDays(selectedDate, minimumStayNights)) {
        setDepartureDate(addDays(selectedDate, minimumStayNights));
      }
    } else {
      setDepartureDate(selectedDate);
    }

    if (Platform.OS === 'android') setDatePickerField(null);
  };

  const openDatePicker = (field: DateField) => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: field === 'arrival' ? arrivalDate : departureDate,
        mode: 'date',
        display: 'default',
        minimumDate: field === 'arrival' ? new Date() : addDays(arrivalDate, minimumStayNights),
        onChange: (event, selectedDate) => handleDateChange(field, event, selectedDate),
      });
      return;
    }

    setDatePickerField(field);
  };

  const toggleOption = (options: string[], setOptions: (nextOptions: string[]) => void, option: string) => {
    setOptions(options.includes(option)
      ? options.filter((selectedOption) => selectedOption !== option)
      : [...options, option]);
  };

  const submitBookingRequest = async () => {
    if (!selectedCircumstance) {
      setErrorMessage('Please choose a care circumstance or select private non-disclosure.');
      return;
    }
    if (selectedCircumstance === 'other' && !otherCircumstance.trim()) {
      setErrorMessage('Please briefly describe your circumstance, or choose private non-disclosure.');
      return;
    }
    if (stayNights < minimumStayNights) {
      setErrorMessage(`Please select at least ${minimumStayNights} nights.`);
      return;
    }
    if (selectedCircumstance === 'emergency-triage' && !isSelectedEmergencySanctuaryAvailable) {
      setErrorMessage('Please select a sanctuary available for your emergency stay dates.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');
    try {
      const profile = await loadProfileSettings();
      const storedBookings = await AsyncStorage.getItem(bookingsStorageKey);
      let existingBookings: StayIntakeBooking[] = [];
      if (storedBookings) {
        try {
          const parsed = JSON.parse(storedBookings);
          if (Array.isArray(parsed)) existingBookings = parsed as StayIntakeBooking[];
        } catch {
          existingBookings = [];
        }
      }

      const now = new Date().toISOString();
      const bookingRequest: StayIntakeBooking = {
        id: `booking-${Date.now()}`,
        beneficiaryId: 'demo-beneficiary',
        beneficiaryName: profile.name || 'Guest',
        propertyId: property.id,
        propertyTitle: property.title,
        propertyAddress: property.address,
        propertyCity: property.city,
        propertyPhoto: property.photos[0],
        startDate: formatDateKey(arrivalDate),
        endDate: formatDateKey(departureDate),
        status: 'pending',
        notes: notes.trim(),
        createdAt: now,
        totalNights: stayNights,
        nightlyRate: property.nightlyPrice,
        totalAmount: estimatedTotal,
        cleaningFee,
        serviceFee,
        guestsCount: guestCount,
        careCircumstance: selectedCircumstance === 'other' ? otherCircumstance.trim() : selectedCircumstance,
        internalSupportNeeds,
        externalSupportNeeds,
      };

      await AsyncStorage.setItem(bookingsStorageKey, JSON.stringify([bookingRequest, ...existingBookings]));
      setIsSubmitted(true);
    } catch {
      setErrorMessage('Could not save your stay request. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={colors.primaryDark} />
          </Pressable>
          <Text style={styles.headerTitle}>{isSubmitted ? 'Stay request' : 'Book a sanctuary'}</Text>
          <View style={styles.headerSpacer} />
        </View>

        {isSubmitted ? (
          <View style={styles.confirmation}>
            <View style={styles.confirmationIcon}>
              <Ionicons name="checkmark" size={29} color={colors.primaryDark} />
            </View>
            <Text style={styles.confirmationTitle}>Stay request saved</Text>
            <Text style={styles.confirmationText}>
              Your request for {property.title} is saved on this device and is awaiting availability confirmation.
            </Text>
            <View style={styles.confirmationSummary}>
              <Text style={styles.summaryLine}>{formatDate(arrivalDate)} – {formatDate(departureDate)}</Text>
              <Text style={styles.summaryLine}>{stayNights} nights · {guestCount} {guestCount === 1 ? 'guest' : 'guests'}</Text>
              <Text style={styles.summaryPrice}>{formatZar(estimatedTotal)} estimated</Text>
            </View>
            <View style={styles.confirmationNeeds}>
              <Text style={styles.confirmationNeedsTitle}>Residency intake</Text>
              <Text style={styles.confirmationNeedsText}>
                Circumstance: {selectedCircumstance === 'emergency-triage'
                  ? 'Emergency Triage'
                  : selectedCircumstance === 'other'
                    ? otherCircumstance
                    : careCircumstances.find((option) => option.value === selectedCircumstance)?.label}
              </Text>
              <Text style={styles.confirmationNeedsText}>
                Internal care: {internalSupportNeeds.length
                  ? internalSupportOptions.filter((option) => internalSupportNeeds.includes(option.id)).map((option) => option.label).join(', ')
                  : 'None selected'}
              </Text>
              <Text style={styles.confirmationNeedsText}>
                External support: {externalSupportNeeds.length
                  ? externalSupportOptions.filter((option) => externalSupportNeeds.includes(option.value)).map((option) => option.label).join(', ')
                  : 'None selected'}
              </Text>
            </View>
            <Pressable style={[styles.primaryButton, styles.confirmationButton]} accessibilityRole="button" onPress={() => router.replace('/stay')}>
              <Text style={[styles.primaryButtonText, styles.confirmationButtonText]}>Back to My Stay</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>Plan your 30-day stay</Text>
            <Text style={styles.pageDescription}>Choose your dates and send a stay request for availability confirmation.</Text>

            <View style={styles.propertyCard}>
              <Image
                source={getSanctuaryImage(property.id)}
                style={styles.propertyImage}
                contentFit="cover"
                accessibilityLabel={`${property.title} sanctuary`}
              />
              <View style={styles.propertyDetails}>
                <Text numberOfLines={2} style={styles.propertyName}>{property.title}</Text>
                <Text numberOfLines={1} style={styles.propertyLocation}>{property.city}</Text>
                <View style={styles.propertyRating}>
                  <Ionicons name="star" size={13} color={colors.accent} />
                  <Text style={styles.propertyRatingText}>{property.rating ?? 4.9}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Residency intake</Text>
            <Text style={styles.intakeDescription}>Choose a start date; your end date defaults to 30 days later. You can extend your stay.</Text>
            <View style={styles.dateRow}>
              <Pressable style={styles.dateField} accessibilityRole="button" onPress={() => openDatePicker('arrival')}>
                <Text style={styles.fieldLabel}>START DATE</Text>
                <View style={styles.dateValueRow}>
                  <Text style={styles.dateValue}>{formatDate(arrivalDate)}</Text>
                  <Ionicons name="calendar-outline" size={17} color={colors.secondaryGreen} />
                </View>
              </Pressable>
              <Pressable style={styles.dateField} accessibilityRole="button" onPress={() => openDatePicker('departure')}>
                <Text style={styles.fieldLabel}>END DATE</Text>
                <View style={styles.dateValueRow}>
                  <Text style={styles.dateValue}>{formatDate(departureDate)}</Text>
                  <Ionicons name="calendar-outline" size={17} color={colors.secondaryGreen} />
                </View>
              </Pressable>
            </View>
            <Text style={styles.helperText}>The end date can’t be earlier than 30 days after your start date. Current selection: {stayNights} nights.</Text>

            {selectedCircumstance === 'emergency-triage' ? (
              <View style={styles.emergencyModeBanner}>
                <View style={styles.emergencyModeIcon}>
                  <Ionicons name="warning" size={19} color="#9B1C1C" />
                </View>
                <View style={styles.emergencyModeCopy}>
                  <Text style={styles.emergencyModeTitle}>Emergency Triage</Text>
                  <Text style={styles.emergencyModeDescription}>Urgent residency intake. Select a sanctuary currently available for your dates.</Text>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Care circumstances</Text>
                <Text style={styles.intakeDescription}>Choose what best describes your current situation. You can keep it private.</Text>
                <Pressable
                  style={styles.dropdownTrigger}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isCircumstanceListOpen }}
                  onPress={() => setIsCircumstanceListOpen((open) => !open)}
                >
                  <Text style={[styles.dropdownValue, !selectedCircumstance && styles.dropdownPlaceholder]}>
                    {selectedCircumstance === 'other'
                      ? 'Other'
                      : careCircumstances.find((option) => option.value === selectedCircumstance)?.label ?? 'Select a circumstance'}
                  </Text>
                  <Ionicons name={isCircumstanceListOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.primaryDark} />
                </Pressable>

                {isCircumstanceListOpen && (
                  <View style={styles.dropdownOptions}>
                    {careCircumstances.map((option) => {
                      const isSelected = selectedCircumstance === option.value;
                      return (
                        <Pressable
                          key={option.value}
                          style={[styles.dropdownOption, isSelected && styles.dropdownOptionSelected]}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isSelected }}
                          onPress={() => {
                            setSelectedCircumstance(option.value);
                            setIsCircumstanceListOpen(false);
                            setErrorMessage('');
                          }}
                        >
                          <Text style={[styles.dropdownOptionText, isSelected && styles.dropdownOptionTextSelected]}>
                            {option.label}
                          </Text>
                          {isSelected && <Ionicons name="checkmark" size={17} color={colors.primaryDark} />}
                        </Pressable>
                      );
                    })}
                  </View>
                )}

                {selectedCircumstance === 'other' && (
                  <TextInput
                    value={otherCircumstance}
                    onChangeText={setOtherCircumstance}
                    placeholder="Share only what you feel comfortable sharing"
                    placeholderTextColor={colors.textSecondary}
                    style={styles.notesInput}
                  />
                )}
              </>
            )}

            {selectedCircumstance === 'emergency-triage' && (
              <View style={styles.emergencyAvailabilitySection}>
                <Text style={styles.sectionTitle}>Available sanctuaries for emergency intake</Text>
                <Text style={styles.intakeDescription}>
                  Mock availability matching {formatDate(arrivalDate)} – {formatDate(departureDate)}. Select a sanctuary to continue.
                </Text>
                {emergencyAvailableProperties.length ? emergencyAvailableProperties.map((candidate) => {
                  const isSelected = candidate.id === property.id;
                  return (
                    <Pressable
                      key={candidate.id}
                      style={[styles.emergencySanctuaryOption, isSelected && styles.emergencySanctuaryOptionSelected]}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => {
                        setSelectedPropertyId(candidate.id);
                        setErrorMessage('');
                      }}
                    >
                      <Image
                        source={getSanctuaryImage(candidate.id)}
                        style={styles.emergencySanctuaryImage}
                        contentFit="cover"
                        accessibilityLabel={`${candidate.title} sanctuary`}
                      />
                      <View style={styles.emergencySanctuaryCopy}>
                        <Text numberOfLines={2} style={styles.emergencySanctuaryName}>{candidate.title}</Text>
                        <Text numberOfLines={1} style={styles.emergencySanctuaryLocation}>{candidate.city}</Text>
                      </View>
                      <Ionicons
                        name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={isSelected ? colors.primaryDark : colors.textSecondary}
                      />
                    </Pressable>
                  );
                }) : (
                  <Text style={styles.noEmergencyAvailability}>No mock sanctuaries are available for these dates. Try a different start date.</Text>
                )}
              </View>
            )}

            <Text style={styles.sectionTitle}>Internal care support</Text>
            <Text style={styles.intakeDescription}>Select any practical support that would make your stay more comfortable.</Text>
            <View style={styles.supportOptions}>
              {internalSupportOptions.map((option) => {
                const isSelected = internalSupportNeeds.includes(option.id);
                return (
                  <Pressable
                    key={option.id}
                    style={[styles.supportOption, isSelected && styles.supportOptionSelected]}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => toggleOption(internalSupportNeeds, setInternalSupportNeeds, option.id)}
                  >
                    <Ionicons name={option.icon} size={18} color={isSelected ? colors.primaryDark : colors.textSecondary} />
                    <Text style={[styles.supportOptionText, isSelected && styles.supportOptionTextSelected]}>{option.label}</Text>
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      {isSelected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Planned external support</Text>
            <Text style={styles.intakeDescription}>Choose services you’d like us to help arrange during your stay.</Text>
            <View style={styles.supportOptions}>
              {externalSupportOptions.map((option) => {
                const isSelected = externalSupportNeeds.includes(option.value);
                return (
                  <Pressable
                    key={option.value}
                    style={[styles.supportOption, isSelected && styles.supportOptionSelected]}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => toggleOption(externalSupportNeeds, setExternalSupportNeeds, option.value)}
                  >
                    <Ionicons name="person-outline" size={18} color={isSelected ? colors.primaryDark : colors.textSecondary} />
                    <Text style={[styles.supportOptionText, isSelected && styles.supportOptionTextSelected]}>{option.label}</Text>
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      {isSelected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.guestRow}>
              <View style={styles.guestCopy}>
                <Text style={styles.sectionTitle}>Guests</Text>
                <Text style={styles.helperText}>Maximum {property.maxGuests ?? 4} guests</Text>
              </View>
              <View style={styles.guestStepper}>
                <Pressable
                  style={styles.stepButton}
                  accessibilityRole="button"
                  accessibilityLabel="Remove one guest"
                  disabled={guestCount <= 1}
                  onPress={() => setGuestCount((count) => Math.max(1, count - 1))}
                >
                  <Ionicons name="remove" size={19} color={guestCount <= 1 ? colors.border : colors.primaryDark} />
                </Pressable>
                <Text style={styles.guestCount}>{guestCount}</Text>
                <Pressable
                  style={styles.stepButton}
                  accessibilityRole="button"
                  accessibilityLabel="Add one guest"
                  disabled={guestCount >= (property.maxGuests ?? 4)}
                  onPress={() => setGuestCount((count) => Math.min(property.maxGuests ?? 4, count + 1))}
                >
                  <Ionicons name="add" size={19} color={colors.primaryDark} />
                </Pressable>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Estimated price</Text>
            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Accommodation · {stayNights} nights</Text>
                <Text style={styles.priceValue}>{formatZar(accommodationCost)}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Cleaning fee</Text>
                <Text style={styles.priceValue}>{formatZar(cleaningFee)}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Service fee</Text>
                <Text style={styles.priceValue}>{formatZar(serviceFee)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Estimated total</Text>
                <Text style={styles.totalValue}>{formatZar(estimatedTotal)}</Text>
              </View>
              <Text style={styles.priceNote}>Final price and availability are confirmed by the Gap Month team.</Text>
            </View>

            <Text style={styles.sectionTitle}>Notes for the care team</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Anything you would like us to know? (optional)"
              placeholderTextColor={colors.textSecondary}
              style={styles.notesInput}
              multiline
              textAlignVertical="top"
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <Pressable
              style={[styles.primaryButton, (isSaving || stayNights < minimumStayNights || (selectedCircumstance === 'emergency-triage' && !isSelectedEmergencySanctuaryAvailable)) && styles.buttonDisabled]}
              accessibilityRole="button"
              disabled={isSaving || stayNights < minimumStayNights || (selectedCircumstance === 'emergency-triage' && !isSelectedEmergencySanctuaryAvailable)}
              onPress={submitBookingRequest}
            >
              <Text style={styles.primaryButtonText}>{isSaving ? 'Saving request…' : 'Request this stay'}</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.demoNote}>Demo booking requests are saved on this device; no payment is taken.</Text>
          </ScrollView>
        )}

        <Modal
          visible={datePickerField !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setDatePickerField(null)}
        >
          <View style={styles.dateModalRoot}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setDatePickerField(null)} />
            <View style={styles.datePickerSheet}>
              <View style={styles.datePickerHeader}>
                <Pressable accessibilityRole="button" onPress={() => setDatePickerField(null)}>
                  <Text style={styles.datePickerAction}>Cancel</Text>
                </Pressable>
                <Text style={styles.datePickerTitle}>{datePickerField === 'arrival' ? 'Arrival date' : 'Departure date'}</Text>
                <Pressable accessibilityRole="button" onPress={() => setDatePickerField(null)}>
                  <Text style={styles.datePickerAction}>Done</Text>
                </Pressable>
              </View>
              {datePickerField && (
                <DateTimePicker
                  value={datePickerField === 'arrival' ? arrivalDate : departureDate}
                  mode="date"
                  display="spinner"
                  themeVariant="light"
                  textColor={colors.text}
                  style={styles.datePicker}
                  minimumDate={datePickerField === 'arrival' ? new Date() : addDays(arrivalDate, minimumStayNights)}
                  onChange={(event, selectedDate) => handleDateChange(datePickerField, event, selectedDate)}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  page: { flex: 1, backgroundColor: colors.background },
  header: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: colors.sage },
  headerTitle: { fontFamily: fonts.sansSemi, fontSize: 15, color: colors.text },
  headerSpacer: { width: 40 },
  content: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontFamily: fonts.sansBold, fontSize: 24, color: colors.text, marginBottom: 6 },
  pageDescription: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginBottom: 18 },
  propertyCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, marginBottom: 22, borderRadius: 17, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  propertyImage: { width: 82, height: 82, borderRadius: 12, backgroundColor: colors.sage },
  propertyDetails: { flex: 1, gap: 5 },
  propertyName: { fontFamily: fonts.sansSemi, fontSize: 13, lineHeight: 18, color: colors.text },
  propertyLocation: { fontFamily: fonts.sans, fontSize: 11, color: colors.textSecondary },
  propertyRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  propertyRatingText: { fontFamily: fonts.sansSemi, fontSize: 11, color: colors.text },
  sectionTitle: { fontFamily: fonts.sansSemi, fontSize: 14, color: colors.text, marginBottom: 9 },
  dateRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  dateField: { flex: 1, minHeight: 68, justifyContent: 'center', gap: 8, paddingHorizontal: 11, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  fieldLabel: { fontFamily: fonts.sansSemi, fontSize: 9, color: colors.textSecondary },
  dateValueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5 },
  dateValue: { fontFamily: fonts.sansSemi, fontSize: 11, color: colors.text },
  helperText: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 16, color: colors.textSecondary, marginBottom: 18 },
  guestRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  guestCopy: { flex: 1 },
  guestStepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  guestCount: { minWidth: 18, fontFamily: fonts.sansSemi, fontSize: 14, textAlign: 'center', color: colors.text },
  priceCard: { padding: 13, marginBottom: 18, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  priceRow: { minHeight: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  priceLabel: { flex: 1, fontFamily: fonts.sans, fontSize: 11, color: colors.textSecondary },
  priceValue: { fontFamily: fonts.sansSemi, fontSize: 11, color: colors.text },
  totalRow: { minHeight: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontFamily: fonts.sansSemi, fontSize: 12, color: colors.primaryDark },
  totalValue: { fontFamily: fonts.sansBold, fontSize: 14, color: colors.primaryDark },
  priceNote: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 15, color: colors.textSecondary, marginTop: 4 },
  notesInput: { minHeight: 84, paddingHorizontal: 12, paddingTop: 11, marginBottom: 18, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.text },
  errorText: { fontFamily: fonts.sans, fontSize: 12, color: '#9B2C32', marginBottom: 10 },
  primaryButton: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, borderRadius: 15, backgroundColor: colors.primaryDark },
  buttonDisabled: { opacity: 0.55 },
  primaryButtonText: { fontFamily: fonts.sansSemi, fontSize: 14, color: '#FFFFFF' },
  demoNote: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 15, color: colors.textSecondary, textAlign: 'center', marginTop: 10 },
  confirmation: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  confirmationIcon: { width: 62, height: 62, alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderRadius: 31, backgroundColor: colors.sage },
  confirmationTitle: { fontFamily: fonts.sansBold, fontSize: 22, color: colors.text, marginBottom: 8 },
  confirmationText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSecondary, textAlign: 'center', marginBottom: 18 },
  confirmationSummary: { width: '100%', gap: 8, padding: 15, marginBottom: 20, borderRadius: 15, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  confirmationButton: { width: '100%', minHeight: 60, alignSelf: 'stretch', paddingHorizontal: 20 },
  confirmationButtonText: { fontSize: 16 },
  summaryLine: { fontFamily: fonts.sans, fontSize: 12, color: colors.text },
  summaryPrice: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.primaryDark, marginTop: 2 },
  dateModalRoot: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(25,35,29,0.35)' },
  datePickerSheet: { paddingBottom: 22, backgroundColor: colors.card, borderTopLeftRadius: 22, borderTopRightRadius: 22 },
  datePickerHeader: { minHeight: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  datePickerTitle: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.text },
  datePickerAction: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.primaryDark },
  datePicker: { width: '100%', minHeight: 216 },
  intakeDescription: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 16, color: colors.textSecondary, marginTop: -4, marginBottom: 10 },
  dropdownTrigger: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingHorizontal: 13, marginBottom: 8, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  dropdownValue: { flex: 1, fontFamily: fonts.sansMedium, fontSize: 12, color: colors.text },
  dropdownPlaceholder: { color: colors.textSecondary },
  dropdownOptions: { marginBottom: 14, overflow: 'hidden', borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  dropdownOption: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  dropdownOptionSelected: { backgroundColor: colors.sage },
  dropdownOptionText: { flex: 1, fontFamily: fonts.sans, fontSize: 11, color: colors.text },
  dropdownOptionTextSelected: { fontFamily: fonts.sansSemi, color: colors.primaryDark },
  supportOptions: { gap: 7, marginBottom: 20 },
  supportOption: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 11, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  supportOptionSelected: { borderColor: colors.primaryDark, backgroundColor: colors.sage },
  supportOptionText: { flex: 1, fontFamily: fonts.sans, fontSize: 11, color: colors.text },
  supportOptionTextSelected: { fontFamily: fonts.sansSemi, color: colors.primaryDark },
  checkbox: { width: 21, height: 21, alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  checkboxSelected: { borderColor: colors.primaryDark, backgroundColor: colors.primaryDark },
  confirmationNeeds: { width: '100%', gap: 8, padding: 14, marginBottom: 20, borderRadius: 15, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  confirmationNeedsTitle: { fontFamily: fonts.sansSemi, fontSize: 13, color: colors.primaryDark },
  confirmationNeedsText: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 16, color: colors.textSecondary },
  emergencyAvailabilitySection: { marginBottom: 18 },
  emergencyModeBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, marginBottom: 15, borderRadius: 14, borderWidth: 1, borderColor: '#E8A6A1', backgroundColor: '#FCE8E7' },
  emergencyModeIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#FFFFFF' },
  emergencyModeCopy: { flex: 1, gap: 3 },
  emergencyModeTitle: { fontFamily: fonts.sansSemi, fontSize: 12, color: '#7F1717' },
  emergencyModeDescription: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 14, color: '#7C3936' },
  emergencySanctuaryOption: { minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 9, marginBottom: 8, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  emergencySanctuaryOptionSelected: { borderWidth: 1.5, borderColor: colors.primaryDark, backgroundColor: colors.sage },
  emergencySanctuaryImage: { width: 62, height: 62, borderRadius: 11, backgroundColor: colors.sage },
  emergencySanctuaryCopy: { flex: 1, gap: 4 },
  emergencySanctuaryName: { fontFamily: fonts.sansSemi, fontSize: 11, lineHeight: 15, color: colors.text },
  emergencySanctuaryLocation: { fontFamily: fonts.sans, fontSize: 10, color: colors.textSecondary },
  noEmergencyAvailability: { padding: 12, borderRadius: 12, backgroundColor: colors.card, fontFamily: fonts.sans, fontSize: 11, lineHeight: 16, color: colors.textSecondary },
});