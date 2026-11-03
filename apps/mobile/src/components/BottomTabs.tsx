import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

type TabKey = 'home' | 'stay' | 'support' | 'messages' | 'notifications';

type BottomTabsProps = {
  activeTab?: TabKey;
};

const tabs: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'stay', label: 'My stay', icon: 'leaf-outline' },
  { key: 'support', label: 'Support', icon: 'help-buoy-outline' },
  { key: 'messages', label: 'Messages', icon: 'chatbubble-ellipses-outline' },
  { key: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
];

export function BottomTabs({ activeTab = 'home' }: BottomTabsProps) {
  const router = useRouter();

  return (
    <View style={styles.shell}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => {
              if (tab.key === 'home') {
                router.navigate('/');
              } else if (tab.key === 'stay') {
                router.navigate('/stay');
              } else if (tab.key === 'support') {
                router.navigate('/support');
              } else {
                router.navigate({ pathname: '/coming-soon', params: { section: tab.label } });
              }
            }}
          >
            <View style={[styles.iconWrap, isActive && styles.activeTab]}>
              <Ionicons
                name={tab.icon}
                size={22}
                color={isActive ? colors.primaryDark : colors.textSecondary}
              />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 34,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#1C3C34',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    marginTop: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 6,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: colors.sage,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textSecondary,
  },
  activeLabel: {
    fontFamily: fonts.sansSemi,
    color: colors.primaryDark,
  },
});
