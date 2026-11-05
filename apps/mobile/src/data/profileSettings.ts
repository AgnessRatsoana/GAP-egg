import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProfileSettings = {
  name: string;
  email: string;
  phone: string;
  photoUri: string | null;
  notificationsEnabled: boolean;
};

export const defaultProfileSettings: ProfileSettings = {
  name: 'Aaliyah',
  email: '',
  phone: '',
  photoUri: null,
  notificationsEnabled: true,
};

const profileSettingsStorageKey = '@gap-month/profile-settings';

export async function loadProfileSettings(): Promise<ProfileSettings> {
  const storedSettings = await AsyncStorage.getItem(profileSettingsStorageKey);
  if (!storedSettings) return defaultProfileSettings;

  try {
    const parsedSettings = JSON.parse(storedSettings) as Partial<ProfileSettings>;
    return {
      ...defaultProfileSettings,
      ...parsedSettings,
      name: typeof parsedSettings.name === 'string' ? parsedSettings.name : defaultProfileSettings.name,
      email: typeof parsedSettings.email === 'string' ? parsedSettings.email : defaultProfileSettings.email,
      phone: typeof parsedSettings.phone === 'string' ? parsedSettings.phone : defaultProfileSettings.phone,
      photoUri: typeof parsedSettings.photoUri === 'string' ? parsedSettings.photoUri : null,
      notificationsEnabled: typeof parsedSettings.notificationsEnabled === 'boolean'
        ? parsedSettings.notificationsEnabled
        : defaultProfileSettings.notificationsEnabled,
    };
  } catch {
    return defaultProfileSettings;
  }
}

export async function saveProfileSettings(settings: ProfileSettings) {
  await AsyncStorage.setItem(profileSettingsStorageKey, JSON.stringify(settings));
}
