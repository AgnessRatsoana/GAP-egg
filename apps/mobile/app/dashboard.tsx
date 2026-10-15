import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>YOUR SANCTUARY</Text>
      <Text style={styles.title}>A gentle place to begin</Text>
      <Text style={styles.body}>
        Dashboard, applications, stay information, support sessions, reflections, comfort,
        messages, settings, and verification will be added here as backend contracts land.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, paddingTop: 88, backgroundColor: '#F3F7FA' },
  eyebrow: { color: '#367A8F', fontSize: 12, letterSpacing: 2, fontWeight: '700' },
  title: { color: '#244B57', fontSize: 32, lineHeight: 40, marginTop: 12, fontWeight: '600' },
  body: { color: '#526B72', fontSize: 17, lineHeight: 26, marginTop: 20 },
});
