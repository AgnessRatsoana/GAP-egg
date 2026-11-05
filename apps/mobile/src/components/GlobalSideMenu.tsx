import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loadProfileSettings, ProfileSettings, defaultProfileSettings } from '../data/profileSettings';
import { colors, fonts } from '../theme';

const currentUserName = 'Aaliyah';

const menuItems = [
  { label: 'Emergency care line', icon: 'warning-outline' as const, route: 'emergency' },
  { label: 'My Gap Month', icon: 'document-text-outline' as const, route: 'my-gap-month' },
  { label: 'Messages', icon: 'chatbubble-ellipses-outline' as const, route: 'Messages' },
  { label: 'Notifications', icon: 'notifications-outline' as const, route: 'Notifications' },
  { label: 'Profile & Settings', icon: 'person-circle-outline' as const, route: 'profile-settings' },
  { label: 'Support', icon: 'help-buoy-outline' as const, route: 'support' },
  { label: 'Get to Know Me', icon: 'heart-outline' as const, route: 'get-to-know-me' },
];

export function GlobalSideMenu() {
  const pathname = usePathname();
  const isPublicEntryScreen = pathname === '/welcome' || pathname === '/auth';
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileSettings>(defaultProfileSettings);

  useEffect(() => {
    if (isPublicEntryScreen) setIsOpen(false);
  }, [isPublicEntryScreen]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    loadProfileSettings()
      .then((settings) => {
        if (isMounted) setProfile(settings);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const openDestination = (destination: string) => {
    closeMenu();
    if (destination === 'my-gap-month') {
      router.push('/my-gap-month');
    } else if (destination === 'support') {
      router.push('/support');
    } else if (destination === 'emergency') {
      router.push('/emergency');
    } else if (destination === 'get-to-know-me') {
      router.push('/get-to-know-me');
    } else if (destination === 'profile-settings') {
      router.push('/profile-settings');
    } else {
      router.push({ pathname: '/coming-soon', params: { section: destination } });
    }
  };

  const logOut = () => {
    closeMenu();
    router.replace('/welcome');
  };

  return (
    <>
      {!isOpen && !isPublicEntryScreen && (
        <Pressable
          style={styles.edgeToggle}
          accessibilityRole="button"
          accessibilityLabel="Open side menu"
          accessibilityState={{ expanded: false }}
          onPress={() => setIsOpen(true)}
        >
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </Pressable>
      )}

      <Modal visible={isOpen && !isPublicEntryScreen} transparent animationType="fade" onRequestClose={closeMenu}>
        <View style={styles.modalRoot}>
          <Pressable
            style={StyleSheet.absoluteFill}
            accessibilityRole="button"
            accessibilityLabel="Close side menu"
            onPress={closeMenu}
          />

          <View style={styles.drawer}>
            <ImageBackground
              source={require('../../../../media/sign-up-in.png')}
              resizeMode="cover"
              style={styles.drawerBackground}
              imageStyle={styles.backgroundImage}
            >
              <View style={styles.backgroundWash}>
                <SafeAreaView style={styles.safeContent}>
                  <View style={styles.drawerContent}>
                    <View style={styles.menuTop}>
                      <Text style={styles.menuTitle}>Menu</Text>
                      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuLinks}>
                        {menuItems.map((item) => (
                          <Pressable
                            key={item.route}
                              style={[styles.menuItem, item.route === 'emergency' && styles.emergencyMenuItem]}
                            accessibilityRole="button"
                            onPress={() => openDestination(item.route)}
                          >
                              <Ionicons
                                name={item.icon}
                                size={21}
                                color={item.route === 'emergency' ? '#9B1C1C' : colors.primaryDark}
                              />
                              <Text style={[styles.menuItemText, item.route === 'emergency' && styles.emergencyMenuItemText]}>
                                {item.label}
                              </Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>

                    <View style={styles.accountActions}>
                      <Pressable
                        style={styles.profileRow}
                        accessibilityRole="button"
                        accessibilityLabel="Open Profile & Settings"
                        onPress={() => openDestination('profile-settings')}
                      >
                        <View style={styles.profileAvatar}>
                          {profile.photoUri ? (
                            <Image source={{ uri: profile.photoUri }} style={styles.profileAvatarImage} contentFit="cover" />
                          ) : (
                            <Text style={styles.profileInitial}>{(profile.name || currentUserName).charAt(0).toUpperCase()}</Text>
                          )}
                        </View>
                        <View style={styles.profileCopy}>
                          <Text style={styles.profileName}>{profile.name || currentUserName}</Text>
                          <Text style={styles.profileLabel}>Logged in</Text>
                        </View>
                      </Pressable>

                      <Pressable
                        style={styles.logoutButton}
                        accessibilityRole="button"
                        accessibilityLabel="Log out and return to welcome"
                        onPress={logOut}
                      >
                        <Ionicons name="log-out-outline" size={19} color="#8F1D2C" />
                        <Text style={styles.logoutText}>Log out</Text>
                      </Pressable>
                    </View>
                  </View>
                </SafeAreaView>
              </View>
            </ImageBackground>
          </View>

          <Pressable
            style={[styles.edgeToggle, styles.openEdgeToggle]}
            accessibilityRole="button"
            accessibilityLabel="Close side menu"
            accessibilityState={{ expanded: true }}
            onPress={closeMenu}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  edgeToggle: {
    position: 'absolute',
    left: -12,
    top: '50%',
    zIndex: 1000,
    width: 32,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -24 }],
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.primaryDark,
    shadowColor: '#173029',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 3 },
    elevation: 8,
  },
  openEdgeToggle: {
    zIndex: 1002,
  },
  modalRoot: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 35, 29, 0.4)',
  },
  drawer: {
    width: '88%',
    maxWidth: 360,
    height: '100%',
    overflow: 'hidden',
    backgroundColor: colors.background,
    elevation: 12,
  },
  drawerBackground: {
    flex: 1,
  },
  backgroundImage: {
    transform: [{ scale: 1.14 }],
  },
  backgroundWash: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  safeContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingLeft: 58,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  accountActions: {
    gap: 10,
    marginBottom: 10,
  },
  menuTop: {
    flexShrink: 1,
  },
  menuTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.primaryDark,
    paddingTop: 32,
    paddingBottom: 16,
  },
  menuLinks: {
    paddingBottom: 12,
  },
  menuItem: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  emergencyMenuItem: {
    paddingHorizontal: 10,
    marginBottom: 6,
    borderRadius: 12,
    backgroundColor: '#FCE8E7',
  },
  emergencyMenuItemText: {
    color: '#9B1C1C',
  },
  menuItemText: {
    flex: 1,
    fontFamily: fonts.sansSemi,
    fontSize: 15,
    color: colors.primaryDark,
  },
  profileRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(21, 91, 70, 0.2)',
    backgroundColor: 'rgba(255,255,255,0.84)',
  },
  profileAvatar: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    backgroundColor: colors.sage,
    overflow: 'hidden',
  },
  profileAvatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInitial: {
    fontFamily: fonts.sansBold,
    fontSize: 19,
    color: colors.primaryDark,
  },
  profileCopy: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.primaryDark,
  },
  profileLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.secondaryGreen,
  },
  logoutButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: 14,
    backgroundColor: '#FCE8E7',
    borderWidth: 1.5,
    borderColor: '#8F1D2C',
  },
  logoutText: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
    color: '#8F1D2C',
  },
});
