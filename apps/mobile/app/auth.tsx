import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.body}>
        Authentication is not connected yet. This screen is a deliberately honest foundation
        for the future secure sign-in flow.
      </Text>
      <Link href="/dashboard" style={styles.link}>View beneficiary foundation</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 32, backgroundColor: '#F3F7FA' },
  title: { color: '#244B57', fontSize: 32, fontWeight: '600' },
  body: { color: '#526B72', fontSize: 17, lineHeight: 26, marginTop: 16 },
  link: { color: '#367A8F', fontWeight: '700', marginTop: 28 },
});
