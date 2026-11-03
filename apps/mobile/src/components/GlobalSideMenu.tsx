import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '../theme';

const currentUserName = 'Aaliyah';

const menuItems = [
  { label: 'My Gap Month', icon: 'document-text-outline' as const, route: 'my-gap-month' },
  { label: 'Messages', icon: 'chatbubble-ellipses-outline' as const, route: 'Messages' },
  { label: 'Notifications', icon: 'notifications-outline' as const, route: 'Notifications' },
  { label: 'Profile & Settings', icon: 'person-circle-outline' as const, route: 'Profile & Settings' },
  { label: 'Support', icon: 'help-buoy-outline' as const, route: 'support' },
  { label: 'Get to Know Me', icon: 'heart-outline' as const, route: 'Get to Know Me' },
];

export function GlobalSideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const openDestination = (destination: string) => {
    closeMenu();
    if (destination === 'my-gap-month') {
      router.push('/my-gap-month');
    } else if (destination === 'support') {
      router.push('/support');
    } else {
      router.push({ pathname: '/coming-soon', params: { section: destination } });
    }
  };

  return (
    <>
      {!isOpen && (
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

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={closeMenu}>
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
                            style={styles.menuItem}
                            accessibilityRole="button"
                            onPress={() => openDestination(item.route)}
                          >
                            <Ionicons name={item.icon} size={21} color={colors.primaryDark} />
                            <Text style={styles.menuItemText}>{item.label}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>

                    <Pressable
                      style={styles.profileRow}
                      accessibilityRole="button"
                      onPress={() => openDestination('Profile & Settings')}
                    >
                      <View style={styles.profileAvatar}>
                        <Text style={styles.profileInitial}>{currentUserName.charAt(0)}</Text>
                      </View>
                      <View style={styles.profileCopy}>
                        <Text style={styles.profileName}>{currentUserName}</Text>
                        <Text style={styles.profileLabel}>Profile & Settings</Text>
                      </View>
                    </Pressable>
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
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.84)',
  },
  profileAvatar: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    backgroundColor: colors.sage,
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
});
