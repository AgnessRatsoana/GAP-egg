import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>MENTEC FOUNDATION</Text>
      <Text style={styles.title}>Your Gap Month</Text>
      <Text style={styles.body}>
        A calm mobile companion for your sanctuary journey. The mobile foundation is ready
        for the beneficiary experience as API capabilities are implemented.
      </Text>
      <Link href="/auth" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 32, backgroundColor: '#F3F7FA' },
  eyebrow: { color: '#367A8F', fontSize: 12, letterSpacing: 2, fontWeight: '700' },
  title: { color: '#244B57', fontSize: 42, marginTop: 12, fontWeight: '500' },
  body: { color: '#526B72', fontSize: 17, lineHeight: 26, marginTop: 20 },
  button: { backgroundColor: '#367A8F', padding: 16, borderRadius: 12, marginTop: 32 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700', fontSize: 16 },
});
